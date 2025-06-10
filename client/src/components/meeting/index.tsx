import React, { useState } from "react";
import {
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import JoinScreen from "./components/JoinScreen";
import MeetingView from "./components/MeetingView";
import { useUser } from "src/hooks/useUser";


function Meeting({
    roomId,
    token,
}: {
    roomId: string,
    token: string,
}) {
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [meetingConfig, setMeetingConfig] = useState({
    micEnabled: true,
    webcamEnabled: true,
  });
  const { user } = useUser();
  const onMeetingLeave = () => {
    setHasJoined(false);
  };

  const onJoinClick = ({ micEnabled, webcamEnabled }: { micEnabled: boolean; webcamEnabled: boolean }) => {
    setMeetingConfig({ micEnabled, webcamEnabled });
    setHasJoined(true);
  };

  return hasJoined ? (
    <MeetingProvider
      config={{
        meetingId: roomId,
        micEnabled: meetingConfig.micEnabled,
        webcamEnabled: meetingConfig.webcamEnabled,
        name: user?.name || "User",
        maxResolution: "sd",
        debugMode: true,
      }}
      token={token}
    >
      <MeetingView onMeetingLeave={onMeetingLeave} autoJoin={true} />
    </MeetingProvider>
  ) : (
    <JoinScreen onClickJoin={onJoinClick} />
  );
}

export default Meeting;