"use client";
import React from "react";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight"; // the mouse-following one
import { RotatingBox } from "./ui/RotatingBox"; // the rotating box

import { Button } from "./ui/moving-border"; // the button with moving border
export default function HeroSection() {
    // This component serves as the hero section of the application
    // It includes a spotlight effect and a rotating box for visual appeal

  return (
    <div className="relative overflow-hidden h-180 w-full flex items-center justify-center flex-col mx-auto py-10 md:py-0">
      <Spotlight />
       <RotatingBox />

      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Master the art of music
        </h1>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Dive into our comprehensive music courses and transform your musical
          journey today...
        </p>



        <div className="mt-4">
          <Link
            href="/courses">

                <Button
                borderRadius="1.75rem"

                className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 ">
                Explore Courses


                </Button>


          </Link>
        </div>
      </div>
    </div>
  );
}
