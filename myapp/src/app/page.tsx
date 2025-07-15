import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import FeaturedCourses from "@/components/FeaturedCourses"; // Importing the FeaturedCourses component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <h1>main  ss page in myapp/src/page.tsx </h1>
      
      <HeroSection />
      {/* Uncomment the following line to include the FeaturedCourses component */}
      <FeaturedCourses />

   
      
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
