import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId, onClose }) {
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo && videoId) {
      GetVideoData();
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    try {
      const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
      console.log(result);
      setVideoData(result[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  return (
    <Dialog
      open={playVideo}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video is Ready
          </DialogTitle>
          <DialogDescription>
            {videoData ? (
              <Player
                component={RemotionVideo}
                durationInFrames={Number(durationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  ...videoData,
                  setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
                }}
              />
            ) : (
              <p>Loading video...</p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;

