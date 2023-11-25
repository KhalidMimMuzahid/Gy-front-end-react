import React from "react";
import FAQ from "./faq";
import HeroHome from "../HeroHome";
import WeAreTrusted from "./WeAreTrusted";
import OurCoreServices from "./OurCoreServices";
import Mission from "./Mission";
import About from "../About";
import QualitySection from "./QualitySec";
import FutureSection from "./Future";
const Home = ({refs}) => {

  return (
    <>
      <HeroHome refset={refs?.homeref} />
      <WeAreTrusted />
      <Mission />
      <About refset={refs?.aboutref} />
      <OurCoreServices refset={refs?.servicesref} />
      <QualitySection/>
      <FutureSection/>
      <FAQ />
    </>
  );
};

export default Home;
