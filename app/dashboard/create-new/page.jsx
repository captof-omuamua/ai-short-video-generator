"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_component/SelectTopic";
import SelectStyle from "./_component/SelectStyle";
import SelectDuration from "./_component/SelectDuration";
import axios from "axios";
import CustomLoading from "./_component/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { Users, VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_component/PlayerDialog";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false); // Initialize to false
  const [videoId, setVideoId] = useState(null); // Initialize to null
  const router = useRouter();
  const {userDetail,setUserDetail}=useContext(UserDetailContext)
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };
  const handleClose = () => {
    setPlayVideo(false);
  };

  const onCreateClickHandler = () => {
    if(userDetail?.credits===0){
      toast("You don't have enough creditsS")
      return;
    }
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILEURL);
    // GenerateImage();
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field";
    console.log(prompt);

    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result,
      }));
      setVideoScript(resp.data.result);
      await GenerateAudioFile(resp.data.result);
    }
  };

  /**
   * Generate audio file and save to Firebase storage
   * @param {*} videoScriptData
   */
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.contentText + " ";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    setVideoData((prev) => ({
      ...prev,
      audioFileUrl: resp.data.result,
    }));
    setAudioFileUrl(resp.data.result);
    console.log("Updated audio file URL in state:", resp.data.result);
    console.log("Result audio:" + resp.data.result);
    resp.data.result &&
      (await GenerateAudioCaption(resp.data.result, videoScriptData));
  };

  /**
   * Generate captions from audio files
   * @param {*} fileUrl
   */
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    console.log(fileUrl);
    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });
    setCaptions(resp?.data?.result);
    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    resp.data.result && (await GenerateImage(videoScriptData));
  };

  /**
   * Generate AI images
   */
  const GenerateImage = async (videoScriptData) => {
    let images = [];
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (e) {
        console.log("Error: " + e);
      }
    }
    setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    if (
      videoData &&
      videoData.videoScript &&
      videoData.audioFileUrl &&
      videoData.captions &&
      videoData.imageList
    ) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    try {
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData?.videoScript,
          audioFileUrl: videoData?.audioFileUrl,
          captions: videoData?.captions,
          imageList: videoData?.imageList,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({
          id: VideoData.id,
        });
  
      console.log("Insert result:", result);
      if (result && result.length > 0) {
        setVideoId(result[0].id); // Set the actual video ID
        setPlayVideo(true); // Open the dialog box
        // Clear videoData state after successful save
        setVideoData({
          videoScript: null,
          audioFileUrl: null,
          captions: null,
          imageList: null,
        });
      } else {
        console.error("Failed to get video ID from the insert result");
      }
    } catch (error) {
      console.error("Error saving video data:", error);
    } finally {
      setLoading(false);
    }
  
    await UpdateUserCredits();
  };

  /**
   * Used to update credits
   */
  const UpdateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credits:userDetail?.credits-10
    }).where(eq(Users?.email,user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setUserDetail(prev=>({
      ...prev,
      "credits":userDetail?.credits-10
    }))

    setVideoData(null);

  }

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}

        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      {/* Conditionally render PlayerDialog when playVideo is true and videoId is available */}
      {playVideo && videoId && (
          <PlayerDialog playVideo={playVideo} videoId={videoId} onClose={handleClose} />
      )}
    </div>
  );
}

export default CreateNew;

