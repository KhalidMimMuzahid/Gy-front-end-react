import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Particle from "../components/Particle";
// import Particle from "../components/Particle";
import Abouts from "../containers/About";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <>
      <Header />
      <div className="ss-trade_front_about_hero_wrapper">
        <div className="container">
          <div className="ss-trade_front_about_hero_container">
            <div className="title">
              <h2>Know About Our Company</h2>
            </div>
          </div>
        </div>
      </div>
      <Abouts />
      <Footer />
    </>
  );
};

export default About;
