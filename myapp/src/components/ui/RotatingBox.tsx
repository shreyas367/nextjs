// components/ui/RotatingBox.tsx
"use client";
import React, { useEffect, useRef } from "react";

export const RotatingBox = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.3;
      if (boxRef.current) {
        boxRef.current.style.transform = `rotateX(${angle}deg) rotateY(${angle * 1.2}deg)`;
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);


  

  return (
    <div className="absolute top-1/2 left-1/2 -z-20 -translate-x-1/2 -translate-y-1/2 perspective-1000">
      <div
        ref={boxRef}
        className="w-1000 h-80 bg-gradient-to-br from-orange-400 to-blue-500 opacity-40 shadow-xl rounded-xl"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.01s linear",
        }}
      ></div>
    </div>
  );
};
