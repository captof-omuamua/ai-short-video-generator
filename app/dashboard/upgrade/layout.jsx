"use client";
import React from "react";
import Image from "next/image";

function UpgradeLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-center items-center mb-6">
        <Image src='/premium.png' alt="Star Logo" width={50} height={50} />
        <h1 className="text-4xl font-bold ml-4">Upgrade</h1>
      </div>
      {children}
    </div>
  );
}

export default UpgradeLayout;

