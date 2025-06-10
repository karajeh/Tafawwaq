import React from "react";
import { useWhiteboard } from "@videosdk.live/react-sdk";

function WhiteboardComponent() {
    const { whiteboardUrl } = useWhiteboard();

    return (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            {whiteboardUrl && (
                <iframe src={whiteboardUrl} width="100%" height="100%"></iframe>
            )}
        </div>
    );
}

export default WhiteboardComponent;