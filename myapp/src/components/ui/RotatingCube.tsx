"use client";
import React from "react";
import { motion } from "framer-motion";

export const RotatingCube = () => {
  return (
    <div className="w-40 h-40 perspective-1000 relative mt-10">
      <motion.div
        className="absolute inset-0 m-auto w-full h-full"
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {["shreyas", "ranjan", "left", "right", "top", "bottom"].map((face) => (
          <CubeFace key={face} face={face} />
        ))}
      </motion.div>
    </div>
  );
};

const faceStyles: Record<string, React.CSSProperties> = {
  shreyas: { transform: "rotateY(0deg) translateZ(80px)" },
  ranjan: { transform: "rotateY(180deg) translateZ(80px)" },
  right: { transform: "rotateY(90deg) translateZ(80px)" },
  left: { transform: "rotateY(-90deg) translateZ(80px)" },
  top: { transform: "rotateX(90deg) translateZ(80px)" },
  bottom: { transform: "rotateX(-90deg) translateZ(80px)" },
};

const CubeFace = ({ face }: { face: string }) => (
  <div
    className="absolute w-40 h-40 bg-gradient-to-br from-blue-500 to-red-500 border border-white opacity-80 text-white flex items-center justify-center"
    style={{
      ...faceStyles[face],
      backfaceVisibility: "hidden",
    }}
  >
    {face.toUpperCase()}
  </div>
);
