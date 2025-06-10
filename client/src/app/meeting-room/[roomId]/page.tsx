'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { validateRoom } from 'src/api/videoService';
import Meeting from 'src/components/meeting';


const MeetingRoom = ({ params }: { params: { roomId: string } }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isRoomValid, setIsRoomValid] = useState(false);
  
  useEffect(() => {
    const checkRoom = async () => {
      try {
        await validateRoom(params.roomId);
        setIsRoomValid(true);
      } catch (error) {
        console.log(error);
        toast.error('Invalid meeting room');
        console.log(error)
        window.location.href = '/';

      }
    };

    if (token) {
      checkRoom();
    }
  }, [params.roomId, token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="mt-2 text-gray-600">You need a valid token to join this meeting.</p>
        </div>
      </div>
    );
  }

  if (!isRoomValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Validating Room</h2>
          <p className="mt-2 text-gray-600">Please wait while we verify the meeting room...</p>
        </div>
      </div>
    );
  }

  return <Meeting token={token} roomId={params.roomId} />;
};

export default MeetingRoom;