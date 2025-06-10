import { useMeeting, useParticipant, useWhiteboard } from "@videosdk.live/react-sdk";
import { Mic, MicOff, Video, VideoOff, ScreenShare, ScreenShareOff, FilePenLine, StopCircle } from "lucide-react"
import RecordIcon from "src/app/components/student/RecordIcon";
import useIsRecording from "src/hooks/useIsRecording";
import { useRouter } from "next/navigation";
import { useUser } from "src/hooks/useUser";
import { startRecording, stopRecording } from 'src/api/videoService';
const Controls: React.FC<{ participantId: string, presenterId: string | undefined }> = ({ participantId, presenterId }) => {
  const router = useRouter();
  const { leave, toggleMic, toggleWebcam, toggleScreenShare, meetingId } = useMeeting();
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useWhiteboard();
  const { webcamOn, micOn } =
  useParticipant(participantId);
  const { user } = useUser();
  const isRecording = useIsRecording();

  const handleScreenShare = async () => {
    try {
      await toggleScreenShare();
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  };

  const handleWhiteboardToggle = () => {
    if (whiteboardUrl) {
      stopWhiteboard();
    } else {
      startWhiteboard();
    }
  };

  const handleLeave = () => {
    leave();
    if (user?.role === "student") {
    router.push("/student");
    } else {
      router.push("/teacher");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  
  const handleStartRecording = async () => {
    await startRecording(meetingId);
  }

  const handleStopRecording = async () => {
    await stopRecording(meetingId);
  };


  return (
    <div className="h-20 bg-[#202124] border-t border-[#3c4043] flex items-center justify-center px-4">

      <div className="flex items-center space-x-2">
        {isRecording ? (
          <button onClick={() => handleStopRecording()} className="p-3 rounded-full hover:bg-[#3c4043] transition-colors bg-[#ea4335]">
            <StopCircle className="w-6 h-6 text-white" />
          </button>
        ) : (

          <button onClick={() => handleStartRecording()} className="p-3 rounded-full hover:bg-[#3c4043] transition-colors bg-[#ea4335]">
            <RecordIcon />
          </button>

        )}
        {/* Mic Control */}
        <button
          onClick={() => toggleMic()}
          className={`p-3 rounded-full hover:bg-[#3c4043] transition-colors ${
            micOn ? 'bg-transparent' : 'bg-[#ea4335]'
          }`}
        >
          {micOn ? 
            <Mic className="w-6 h-6 text-white" /> : 
            <MicOff className="w-6 h-6 text-white" />}
        </button>

        {/* Camera Control */}
        <button
          onClick={() => toggleWebcam()}
          className={`p-3 rounded-full hover:bg-[#3c4043] transition-colors ${
            webcamOn ? 'bg-transparent' : 'bg-[#ea4335]'
          }`}
        >
          {webcamOn ? 
            <Video className="w-6 h-6 text-white" /> : 
            <VideoOff className="w-6 h-6 text-white" />}
        </button>

        {/* Screen Share */}
        <button
          onClick={() => {
            handleScreenShare();
          }}
          className={`p-3 rounded-full transition-colors ${
            presenterId === participantId 
              ? 'bg-[#8ab4f8] text-[#202124]' 
              : 'hover:bg-[#3c4043] text-white'
          }`}
        >
          {presenterId === participantId ? 
            <ScreenShareOff className="w-6 h-6" /> : 
            <ScreenShare className="w-6 h-6" />}
        </button>

        {/* Whiteboard Toggle */}
        <button
          onClick={() => {
            handleWhiteboardToggle();
          }}
          className={`p-3 rounded-full transition-colors ${
            whiteboardUrl 
              ? 'bg-[#8ab4f8] text-[#202124]' 
              : 'hover:bg-[#3c4043] text-white'
          }`}
        >
          <FilePenLine className="w-6 h-6" />
        </button>

        {/* Leave Meeting */}
        <button
          onClick={() => {
            handleLeave();
          }}
          className="bg-[#ea4335] hover:bg-[#dc2626] text-white px-4 py-2 rounded-full ml-4"
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default Controls;