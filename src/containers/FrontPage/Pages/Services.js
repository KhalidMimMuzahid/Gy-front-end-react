import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Particle from "../components/Particle";
import BusinessPlanCard from "../containers/Home/businessPlanCard";
import Service from "../containers/Service";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <>
      <Header />
      <Service />
      <BusinessPlanCard className="services_page_card" />
      <Footer />
    </>
  );
};

export default Services;
