"use client";

import Benefits from "@/components/layout/LandingComponents/Benefits";
import CTA from "@/components/layout/LandingComponents/CTA";
import Features from "@/components/layout/LandingComponents/Features";
import Hero from "@/components/layout/LandingComponents/Hero";
import Navbar from "@/components/layout/LandingComponents/NavBar";
import Prices from "@/components/layout/LandingComponents/Prices";
import Testimonials from "@/components/layout/LandingComponents/Testimonials";
import { Footer } from "react-day-picker";

const Main = () => {
  return (
    <div className="min-h-screen bg-[#e6f0ff] w-full">
      <Navbar />
      <Hero />
      <Benefits />
      <Features />
      <Testimonials />
      <Prices />
      <CTA />
      <Footer />
    </div>
  );
};
export default Main;
