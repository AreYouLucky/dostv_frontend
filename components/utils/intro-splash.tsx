
"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function IntroSplash({ onFinish }: { onFinish: () => void }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 100);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="animate-intro-logo">
        <Image
          src="/storage/images/logos/logo.png"
          alt="DOSTV"
          width={100}
          height={100}
          priority
          className="-mt-10"
        />
      </div>
    </div>
  );
}
