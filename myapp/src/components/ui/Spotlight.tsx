"use client";
import { useEffect, useState } from "react";

export const Spotlight = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!position) return null;

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-10">
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] transition-all duration-100"
        style={{
          left: position.x - 200,
          top: position.y - 200,
        }}
      />
    </div>
  );
};
