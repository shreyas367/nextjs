    import React from 'react'
import { StickyScroll } from './ui/sticky-scroll-reveal'

export const musicSchoolFeatures = [
  {
    title: "Beginner Guitar Lessons",
    description: "Master chords, strumming, and basic music theory with our step-by-step guitar course.",
   
  },
  {
    title: "Piano for All Ages",
    description: "From classical to pop – learn piano fundamentals with expert instructors.",
 
  },
  {
    title: "Vocal Training",
    description: "Improve pitch, tone, and range with professional vocal coaching.",

  },
  {
    title: "Music Production",
    description: "Create your own beats, mix, and master tracks using industry-standard software.",

  },
  {
    title: "Live Performance Skills",
    description: "Boost stage confidence and learn how to perform live in front of an audience.",
  
  },
  {
    title: "Theory & Composition",
    description: "Understand music structure, harmony, and how to compose your own songs.",
 
  }
];


export default function WhyChooseUs() {
  return (
    <div>
     <StickyScroll content={musicSchoolFeatures} />
    </div>
  )
}