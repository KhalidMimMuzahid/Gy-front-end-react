import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Particle from "../components/Particle";
import Plan from "../containers/Plan";
const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <>
      <Header hidePackageRoute />
      <Plan />
      <Footer />
    </>
  );
};

export default Packages;
