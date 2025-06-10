'use client';
import Image from 'next/image';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import eye from 'public/images/my-account/Eye.svg';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
// import axios from "axios";
import axiosInstance from 'src/api/axiosInstance';
import apiRoutes from 'src/api/apiRoutes';
import { usePathname } from 'next/navigation';
// type CheckedState = {
//   knowBuyers: boolean;
//   knowReviewers: boolean;
//   knowCommenters: boolean;
//   knowDownloaders: boolean;
// };

export const ChangePassword = () => {
  const pathname = usePathname();
  const lastPart = pathname.split('/').pop();

  // const [checkedState, setCheckedState] = useState<CheckedState>({
  //   knowBuyers: false,
  //   knowReviewers: false,
  //   knowCommenters: false,
  //   knowDownloaders: false,
  // });

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  // State variables
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [notifyOnCourseBuy, setNotifyOnCourseBuy] = useState(true);
  const [notifyOnReviewWrite, setNotifyOnReviewWrite] = useState(true);
  const [notifyOnComment, setNotifyOnComment] = useState(true);
  const [notifyOnLectureDownload, setNotifyOnLectureDownload] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('sessionToken');
      if (!token) {
        // toast.error("Session token is missing. Please log in again.");
        return;
      }

      try {
        const response = await axiosInstance.get(apiRoutes.getUserProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userData = response.data;
          console.log(userData);
          setNotifyOnCourseBuy(
            userData.teacher.notifications.notifyOnCourseBuy,
          );
          setNotifyOnReviewWrite(
            userData.teacher.notifications.notifyOnReviewWrite,
          );
          setNotifyOnComment(userData.teacher.notifications.notifyOnComment);
          setNotifyOnLectureDownload(
            userData.teacher.notifications.notifyOnLectureDownload,
          );
        } else {
          toast.error('Failed to fetch profile. Please try again.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching the profile.');
      }
    };

    fetchProfile();
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Handle password change submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!token) {
      toast.error(
        'Empty Inputs, Please fill in the required fields to proceed',
      );
      return;
    }

    try {
      const response = await axiosInstance.post(
        apiRoutes.resetPassword(token),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      const data = response.data;
      if (response.status === 200) {
        toast.success('Password reset successful');
        router.push('/login');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      toast.error('An error occurred while resetting password');
    }
  };

  // Handle notification changes and update user profile with axios.put
  const handleNotificationSubmit = async () => {
    const updatedNotifications = {
      notifyOnCourseBuy,
      notifyOnReviewWrite,
      notifyOnComment,
      notifyOnLectureDownload,
    };

    // Get the token from localStorage
    const authToken = localStorage.getItem('sessionToken');

    if (!authToken) {
      toast.error('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await axiosInstance.put(
        apiRoutes.updateUserProfile,
        {
          notifications: updatedNotifications,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`, // Include the token in the header
          },
        },
      );

      if (response.status === 200) {
        toast.success('Notification settings updated');
      } else {
        toast.error(
          response.data.message ||
            'An error occurred while updating notifications',
        );
      }
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast.error('An error occurred while updating notifications');
    }
  };

  // Handle input changes for password and notifications
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(e.target.value);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setter(e.target.checked);
  };

  return (
    <Suspense>
      <div>
        {lastPart == 'settings' ? (
          //  Password Change Form
          <div className="md:w-[346px] px-[16px] shadow-2xl mt-[24px] md:mt-[0px] pb-[16px] rounded-[8px]">
            <h1 className="text-[24px] font-semibold">Change Password</h1>
            {/* Current Password */}
            <h1 className="text-[14px] mt-[24px]">Current Password</h1>
            <div className="relative flex items-center">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="border h-[35px] mt-[6px] md:h-[42px] px-2 md:px-5 pr-10 w-full"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => handleInputChange(e, setCurrentPassword)}
              />
              <Image
                src={eye}
                alt="eye"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            {/* New Password */}
            <h1 className="text-[14px] mt-[24px]">New Password</h1>
            <div className="relative flex items-center">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="border h-[35px] mt-[6px] md:h-[42px] px-2 md:px-5 pr-10 w-full"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => handleInputChange(e, setNewPassword)}
              />
              <Image
                src={eye}
                alt="eye"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            {/* Confirm New Password */}
            <h1 className="text-[14px] mt-[24px]">Confirm Password</h1>
            <div className="relative flex items-center">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="border h-[35px] mt-[6px] md:h-[42px] px-2 md:px-5 pr-10 w-full"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
              />
              <Image
                src={eye}
                alt="eye"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            <div
              className="bg-[#FF6636] flex items-center justify-center mt-[24px] w-[200px] h-[40px] md:h-[50px] rounded-[7px]"
              onClick={handlePasswordSubmit}
            >
              <h1 className="text-white font-semibold">Change Password</h1>
            </div>
          </div>
        ) : (
          //  Notification Settings Form

          <div className="md:w-[346px] px-[16px] shadow-2xl mt-[24px] md:mt-[24px] pb-[16px] rounded-[8px] pt-[16px]">
            <h1 className="text-[24px] font-semibold">Notifications</h1>
            <div>
              <input
                type="checkbox"
                checked={notifyOnCourseBuy}
                id="notifyOnCourseBuy"
                onChange={(e) => handleCheckboxChange(e, setNotifyOnCourseBuy)}
                className="mt-[16px] accent-orange-500"
                defaultChecked
              />
              {notifyOnCourseBuy &&
                <label htmlFor="" className="ml-[10px] text-gray">
                  I&apos;d like to receive marketing emails.
                </label>
              }
              {!notifyOnCourseBuy &&
                <label htmlFor="" className="ml-[10px] text-black">
                  I&apos;d like to receive marketing emails.
                </label>
              }
            </div>
            <div>
              <input
                type="checkbox"
                checked={notifyOnReviewWrite}
                id="notifyOnReviewWrite"
                onChange={(e) =>
                  handleCheckboxChange(e, setNotifyOnReviewWrite)
                }
                className="mt-[16px] accent-orange-500"
                defaultChecked
              />
              {notifyOnReviewWrite &&
                <label htmlFor="" className="ml-[10px] text-gray">
                  I&apos;d like to be notfied when I receive feedback.
                </label>
              }
              {!notifyOnReviewWrite &&
                <label htmlFor="" className="ml-[10px] text-black">
                  I&apos;d like to be notfied when I receive feedback.
                </label>
              }
            </div>
            <div>
              <input
                type="checkbox"
                checked={notifyOnComment}
                id="notifyOnComment"
                onChange={(e) => handleCheckboxChange(e, setNotifyOnComment)}
                className="mt-[16px] accent-orange-500"
                defaultChecked
              />
              {notifyOnComment &&
                (<label htmlFor="" className="ml-[10px] text-gray">
                  I&apos;d like to receive the latest product updates.
                </label>
              )}
              {!notifyOnComment && (
                <label htmlFor="" className="ml-[10px] text-black">
                  I&apos;d like to receive the latest product updates.
                </label>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                checked={notifyOnLectureDownload}
                id="notifyOnLectureDownload"
                onChange={(e) =>
                  handleCheckboxChange(e, setNotifyOnLectureDownload)
                }
                className="mt-[16px] accent-orange-500"

              />
              {notifyOnLectureDownload &&
                <label htmlFor="" className="ml-[10px] text-gray">
                  I&apos;d love to receive new tips and methods to enchance my
                  tutoring skills
                </label>
              }
              {!notifyOnLectureDownload &&
                <label htmlFor="" className="ml-[10px] text-black">
                  I&apos;d love to receive new tips and methods to enchance my
                  tutoring skills
                </label>
              }
            </div>

            <button
              className="bg-[#FF6636] flex items-center justify-center mt-[24px] w-[200px] h-[40px] md:h-[50px] rounded-[7px] duration-300 hover:scale-[1.1]"
              onClick={handleNotificationSubmit}
            >
              <h1 className="text-white font-semibold">Save Changes</h1>
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </Suspense>
  );
};
