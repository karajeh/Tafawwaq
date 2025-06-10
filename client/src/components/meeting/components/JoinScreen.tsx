import React, { useState, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

function JoinScreen({
  onClickJoin,
}: {
  onClickJoin: (options: {
    micEnabled: boolean;
    webcamEnabled: boolean;
  }) => void;
}) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Create a memoized video stream URL
  const videoStream = useMemo(() => {
    if (webcamEnabled && stream) {
      return stream;
    }
    return null;
  }, [stream, webcamEnabled]);

  useEffect(() => {
    const enableCamera = async () => {
      if (webcamEnabled) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          setStream(mediaStream);
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      } else {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
      }
    };

    enableCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [webcamEnabled, stream]);

  const onClick = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onClickJoin({ micEnabled, webcamEnabled });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Join Meeting</h2>

        {/* Video Preview */}
        <div className="mb-6 rounded-lg overflow-hidden bg-gray-200">
          {webcamEnabled && videoStream ? (
            <ReactPlayer
              playsinline
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream}
              width="100%"
              height="200px"
              onError={(err) => {
                console.log(err, "preview video error");
              }}
              className="object-cover"
            />
          ) : (
            <div className="h-[200px] bg-gray-200 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`p-3 rounded-full ${
              micEnabled
                ? "bg-secondary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {micEnabled ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={() => setWebcamEnabled(!webcamEnabled)}
            className={`p-3 rounded-full ${
              webcamEnabled
                ? "bg-secondary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {webcamEnabled ? (
              <Video className="w-6 h-6" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </button>
        </div>

        <button
          onClick={onClick}
          className="w-full bg-secondary hover:brightness-110 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          Join Now
        </button>
      </div>
    </div>
  );
}

export default JoinScreen;
