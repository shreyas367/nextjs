'use client'
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
 import Link from "next/link";



function Navbar({ className }: { className?: string }) {
      const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      
        <Menu setActive={setActive}>


          
          <Link href= "/" className="text-black dark:text-white">
            <MenuItem setActive={setActive} active={active} item="Home">
            </MenuItem>
          </Link>

          <MenuItem setActive={setActive} active={active} item="All Courses">
            <div className="flex flex-col space-y-4">
                <HoveredLink href="/courses">Advanced courses</HoveredLink>
             <HoveredLink href="/courses">basic music theory</HoveredLink>
                <HoveredLink href="/courses">music production</HoveredLink>
                <HoveredLink href="/courses">vocal training</HoveredLink>
                <HoveredLink href="/courses">music history</HoveredLink>
              <HoveredLink href="/courses">instrument learing</HoveredLink>
               <HoveredLink href="/courses">songwriting</HoveredLink>

            </div>
          </MenuItem>



        <Link href="/contact" className="text-black dark:text-white">
          <MenuItem setActive={setActive} active={active} item="Contact Us">
          </MenuItem>
        </Link>






        </Menu>
    </div>
  )
}
export default Navbar
