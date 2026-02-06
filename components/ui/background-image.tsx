"use client";

import React, { useEffect, useState } from "react";

type BackgroundImageProps = {
  imageSrc?: string;
  fallbackSrc?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function BackgroundImg({
  imageSrc,
  fallbackSrc = "/images/logos/dostv.png",
  className = "",
  children,
}: BackgroundImageProps) {
  const effectiveSrc = imageSrc || fallbackSrc;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!effectiveSrc) return;

    const img = new Image();
    img.src = effectiveSrc;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // fail gracefully

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [effectiveSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-0 animate-pulse bg-gray-800">
          <div className="h-full w-full bg-linear-to-r from-gray-800 via-gray-700 to-gray-800" />
        </div>
      )}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${effectiveSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
