import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import { MicOff, VideoOff, } from "lucide-react"
import ReactPlayer from "react-player";

function ParticipantView({ participantId }: { participantId: string }) {
    const micRef = useRef<HTMLAudioElement | null>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(participantId);
  
    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);
  
    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
  
          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);
  
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#3c4043]">
      <div className="absolute inset-0">
        {webcamOn ? (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width="100%"
            height="100%"
            onError={(err) => {
              console.log(err, "participant video error");
            }}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#8ab4f8] flex items-center justify-center">
              <span className="text-[#202124] text-2xl font-medium">
                {displayName?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
        )}
        
        {/* Participant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-medium">{displayName}</span>
            <div className="flex items-center space-x-1">
              {!micOn && (
                <div className="bg-[#ea4335] rounded-full p-1">
                  <MicOff className="w-3 h-3 text-white" />
                </div>
              )}
              {!webcamOn && (
                <div className="bg-[#ea4335] rounded-full p-1">
                  <VideoOff className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <audio ref={micRef} autoPlay muted={isLocal} />
    </div>
    );
}

export default ParticipantView;