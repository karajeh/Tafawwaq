import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { useEffect, useMemo, useRef } from "react";

function ScreenShareView({ participantId }: { participantId: string }) {
    const { screenShareStream, screenShareOn, displayName, screenShareAudioStream, isLocal } = useParticipant(participantId);
    const audioPlayer = useRef<HTMLAudioElement>(null);

    const mediaStream = useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    // Handle screen share audio
    useEffect(() => {
        if (audioPlayer.current && !isLocal && screenShareOn && screenShareAudioStream) {
            const audioStream = new MediaStream();
            audioStream.addTrack(screenShareAudioStream.track);
            audioPlayer.current.srcObject = audioStream;
            audioPlayer.current.play().catch((err) => {
                console.error("Error playing audio:", err);
            });
        } else if (audioPlayer.current) {
            audioPlayer.current.srcObject = null;
        }
    }, [screenShareAudioStream, screenShareOn, isLocal]);

    return screenShareOn ? (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <ReactPlayer
                playsinline
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={mediaStream}
                width="100%"
                height="100%"
                onError={(err) => {
                    console.log(err, "screen share error");
                }}
                className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white font-medium">{displayName}&apos;s screen</span>
            </div>
            <audio ref={audioPlayer} autoPlay playsInline />
        </div>
    ) : null;
}

export default ScreenShareView;