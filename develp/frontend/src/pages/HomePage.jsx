import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import KeyFeatures from "../components/KeyFeatures";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Graph from "./Graph";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
      < Graph />
    </>
  );
};

export default HomePage;
