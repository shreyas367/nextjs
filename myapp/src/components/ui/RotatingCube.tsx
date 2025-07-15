"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const RotatingCube = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 200], [-15, 15]);

  const smoothX = useSpring(rotateX, { stiffness: 100, damping: 10 });
  const smoothY = useSpring(rotateY, { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      className="w-52 h-52 perspective-1000 relative mt-12"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute inset-0 m-auto w-full h-full"
        animate={!isHovering ? { rotateX: 360, rotateY: 360 } : {}}
        transition={!isHovering ? { repeat: Infinity, duration: 15, ease: "linear" } : undefined}
        style={{
          transformStyle: "preserve-3d",
          rotateX: isHovering ? smoothX : undefined,
          rotateY: isHovering ? smoothY : undefined,
        }}
      >
        {["front", "back", "left", "right", "top", "bottom"].map((face) => (
          <CubeFace key={face} face={face} />
        ))}
      </motion.div>
    </div>
  );
};

const faceStyles: Record<string, React.CSSProperties> = {
  front: { transform: "rotateY(0deg) translateZ(100px)" },
  back: { transform: "rotateY(180deg) translateZ(100px)" },
  right: { transform: "rotateY(90deg) translateZ(100px)" },
  left: { transform: "rotateY(-90deg) translateZ(100px)" },
  top: { transform: "rotateX(90deg) translateZ(100px)" },
  bottom: { transform: "rotateX(-90deg) translateZ(100px)" },
};

const CubeFace = ({ face }: { face: string }) => (
  <div
    className="absolute w-52 h-52 bg-gradient-to-br from-sky-500 to-purple-600 border border-white opacity-90 text-white flex items-center justify-center font-bold"
    style={{
      ...faceStyles[face],
      backfaceVisibility: "hidden",
    }}
  >
    {face.toUpperCase()}
  </div>
);
