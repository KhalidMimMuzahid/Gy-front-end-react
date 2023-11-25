import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../containers/FrontPage/Pages/About";
import Contact from "../containers/FrontPage/Pages/Contact";
import Home from "../containers/FrontPage/Pages/Home";
// import Services from "../containers/FrontPage/Pages/Services";
// import SideBarSocialIcon from "../components/SideBarSocialIcon/SideBarSocialIcon";
import Particle from "../containers/FrontPage/components/Particle";
import Plan from "../containers/FrontPage/Pages/Plan";
import ComingSoon from "../components/ComingSoon/ComingSoon";
import PlanPDF from "../containers/FrontPage/components/PlanPDF";
// import Packages from "../containers/FrontPage/Pages/Packages";
const FrontPage = () => {
  return (
    <>
    {/* <Particle/> */}
      {/* <SideBarSocialIcon/> */}
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/planPDF" element={<PlanPDF />} />
        <Route path="/income-types" element={<Plan />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coming-soon/broker" element={<ComingSoon name ='Broker' />} />
        <Route path="/coming-soon/real-estate" element={<ComingSoon name ='Real Estate'  />} />
      </Routes>
    </>
  );
};

export default FrontPage;
