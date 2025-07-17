import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import FeaturedCourses from "@/components/FeaturedCourses"; // Importing the FeaturedCourses component
import WhyChooseUs from "@/components/WhyChooseUs"; // Importing the WhyChooseUs component

import UpcomingWebinars from "@/components/UpcomingWebinars";
import Instructors from "@/components/Instructors"; // Importing the Instructors component
import Footer from "@/components/Footer"; // Importing the Footer component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <h1>main  ss page in myapp/src/page.tsx </h1>
      
      <HeroSection />


       
      <FeaturedCourses />
       
      <WhyChooseUs />


      <UpcomingWebinars />


      <Instructors />


      <Footer />
      
      {/* Uncomment the following lines to add a heading and an image */}

      

   
      
      {/* <h1 className="text-3xl font-bold underline">
        Welcome to your <span className="text-blue-500">Next.js</span> app!
        <br />
        <br />
        <p> main home page of src/app/page </p>
      <br />
      </h1> */}
      {/* <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={36}
        priority
      /> */}
    </main>
  
  );
}
