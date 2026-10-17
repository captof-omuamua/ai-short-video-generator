"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogTitle>Loading</AlertDialogTitle>
        <AlertDialogDescription>
          Please wait while we process your request.
        </AlertDialogDescription>
        <div className="bg-white flex flex-col items-center">
          <Image src="/progress.gif" width={100} height={100} alt="Loading" />
          <h2>Loading...</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;

