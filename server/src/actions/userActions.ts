import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { StudentModel } from '../db/models/student';
import { TeacherModel } from '../db/models/teacher';
import { UserModel } from '../db/models/user';
import { UpdateUserInfoData } from '../types/updateUser';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const updateProfileAction = async ({
  userId,
  role,
  updateData,
}: UpdateUserInfoData) => {
  const { name, email, profilePicture, bio, ...roleData } = updateData;

  const existingUser = await UserModel.findById(userId).lean();
  if (!existingUser) throw new Error('User not found');

  let profilePictureUrl = existingUser.profilePicture;

  if (profilePicture) {
    if (profilePictureUrl) {
      const oldKey = profilePictureUrl.split('/').pop();
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: oldKey!,
        }),
      );
    }

    const newKey = `${userId}/profile-${Date.now()}.jpg`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: newKey,
        Body: profilePicture,
        ACL: 'public-read',
      }),
    );

    profilePictureUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newKey}`;
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { name, email, profilePicture: profilePictureUrl, bio },
    { new: true },
  ).lean();
  if (!updatedUser) throw new Error('User not found');

  let roleUpdate = null;
  if (role === 'Student' && roleData) {
    roleUpdate = await StudentModel.findByIdAndUpdate(
      updatedUser.roleId,
      { ...roleData },
      { new: true },
    ).lean();
  } else if (role === 'Teacher' && roleData) {
    roleUpdate = await TeacherModel.findByIdAndUpdate(
      updatedUser.roleId,
      { ...roleData },
      { new: true },
    ).lean();
  }

  return {
    ...updatedUser,
    ...(role === 'Student' ? { student: roleUpdate } : {}),
    ...(role === 'Teacher' ? { teacher: roleUpdate } : {}),
  };
};

export const getProfileAction = async ({ userId, role }: { userId: string; role: 'Student' | 'Teacher' }) => {
  const user = await UserModel.findById(userId).lean();
  if (!user) throw new Error('User not found');
  
  let roleData = null;
  if (role === 'Teacher') {
    roleData = await TeacherModel.findOne({ user: userId }).lean();
  } else if (role === 'Student') {
    roleData = await StudentModel.findOne({ user: userId }).lean();
  }

  return {
    ...user,
    ...(roleData ? { [role.toLowerCase()]: roleData } : {}),
  };
};
