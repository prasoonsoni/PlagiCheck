import React from "react";
import { FaBriefcaseMedical, FaLock, FaMousePointer } from "react-icons/fa";

import Navbar from "../components/Utility/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Utility/Footer";

const Home = () => {
  const icons = [FaBriefcaseMedical, FaLock, FaMousePointer];
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
