import { useMeeting, useWhiteboard } from "@videosdk.live/react-sdk";
import { useState, useEffect } from "react";
import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import ScreenShareView from "./ScreenShareView";
import WhiteboardComponent from './WhiteBoardView';
function MeetingView({
  onMeetingLeave,
  autoJoin = false,
}: {
  onMeetingLeave: () => void,
  autoJoin?: boolean,
}) {
  const [joined, setJoined] = useState<string | null>(null);
  const {whiteboardUrl } = useWhiteboard();
  const { join, participants, presenterId, localParticipant } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
    onPresenterChanged: (presenterId) => {
      console.log("Presenter changed:", presenterId);
    },
  });

  useEffect(() => {
    if (autoJoin && !joined) {
      setJoined("JOINING");
      join();
    }
  }, [autoJoin, join, joined]);

  return (
    <div className="h-screen bg-[#202124] flex flex-col">
      <div className="flex-1 relative">
        {presenterId ? (
          // Screen sharing layout
          <div className="absolute inset-0 p-4 flex gap-4">
            {/* Screen share takes up most of the space */}
            <div className="flex-grow">
              <ScreenShareView participantId={presenterId} />
            </div>

            {/* Participants in a compact sidebar */}
            <div className="w-64 flex flex-col gap-2 overflow-y-auto">
              {Array.from(participants.values()).map((participant) => (
                <ParticipantView
                  key={participant.id}
                  participantId={participant.id}
                />
              ))}
            </div>
          </div>
        ) : (
          // Regular grid layout when no screen sharing
          <div className="absolute inset-0 p-4">
            {/* Auto-grid layout for participants */}
            <div className="absolute inset-0 p-4">
              <div className="h-full flex gap-4">
                <div className={`flex-grow ${!whiteboardUrl ? 'hidden' : ''}`}>
                  <WhiteboardComponent />
                </div>
                <div className={whiteboardUrl 
                  ? "w-64 flex flex-col gap-2 overflow-y-auto"
                  : "w-full grid gap-4 auto-rows-fr"
                  } style={{
                    gridTemplateColumns: !whiteboardUrl ? `repeat(${
                      participants.size <= 1 ? 1 :
                      participants.size <= 2 ? 2 :
                      participants.size <= 4 ? 2 : 
                      participants.size <= 9 ? 3 : 4
                    }, 1fr)` : 'auto'
                  }}>
                  {Array.from(participants.values()).map((participant) => (
                    <ParticipantView
                      key={participant.id}
                      participantId={participant.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Controls participantId={localParticipant?.id} presenterId={presenterId}/>
    </div>
  );
}

export default MeetingView;