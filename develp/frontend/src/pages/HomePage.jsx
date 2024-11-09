import React, { useRef } from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import KeyFeatures from "../components/KeyFeatures";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const HomePage = () => {
  const topRef = useRef(null);
  const howItWorksRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === "top") {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "howItWorks") {
      howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Pasa la función scrollToSection a NavBar */}
      <NavBar scrollToSection={scrollToSection} />
      <div ref={topRef} /> {/* Parte superior de la página */}
      <HeroSection />
      <KeyFeatures />
      <div ref={howItWorksRef} /> {/* Parte superior de HowItWorks */}
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default HomePage;
