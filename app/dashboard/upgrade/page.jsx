"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function UpgradePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Upgrade to Premium Service
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Create unlimited videos and enjoy extended video length with our premium service.
      </p>
      <Button
        className="px-6 py-3 text-white bg-primary hover:bg-primary-dark"
        onClick={() => {
          window.location.href = "mailto:support@example.com?subject=Upgrade Request&body=Hello, I would like to upgrade my account to the premium service.";
        }}
      >
        Upgrade Now
      </Button>
    </div>
  );
}

export default UpgradePage;

