"use client";

import Benefits from "@/components/layout/LandingComponents/Benefits";
import CTA from "@/components/layout/LandingComponents/CTA";
import Features from "@/components/layout/LandingComponents/Features";
import Footer from "@/components/layout/LandingComponents/Footer";
// import FuturasImplementacoes from "@/components/layout/LandingComponents/futurasImplementacoes";
import Hero from "@/components/layout/LandingComponents/Hero";
import Navbar from "@/components/layout/LandingComponents/NavBar";
import Prices from "@/components/layout/LandingComponents/Prices";
import Testimonials from "@/components/layout/LandingComponents/Testimonials";

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
      {/* <FuturasImplementacoes /> */}
      <Footer />
    </div>
  );
};
export default Main;
