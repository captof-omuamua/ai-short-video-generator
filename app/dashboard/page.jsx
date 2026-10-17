"use client"
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "./_component/EmptyState";
import Link from "next/link";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import VideoList from "./_component/VideoList";


function Dashboard(){
    const[videosList,setVideoList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
        user&&GetVideoList();

    },[user])
    /**
     * Use to get users Video
     */

    const GetVideoList=async()=>{
        const result = await db.select().from(VideoData)
        .where(eq(VideoData?.createdBy,user?.primaryEmailAddress?.emailAddress));
        console.log(result);
        setVideoList(result);
    }
    
    return(
        <div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
                <Link href={'dashboard/create-new'}>
                    <Button>+ Create New</Button>
                </Link>
            </div>

            {/* Empty State*/}
            {videosList?.length==0&&<div>
                <EmptyState/>
            </div>}

            {/*list of videos*/}
            <VideoList videoList={videosList}/>
        </div>
        
    )
}

export default Dashboard
