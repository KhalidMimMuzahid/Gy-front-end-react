import React from "react";
import herobg from "../../../../assets/forex.jpg";

const HeroHome = ({refset}) => {
  return (
    <div ref={refset} className="sst_home-banner">
      <div className="container sst_hero-container">
        <div className="sst_herro-left">
          <div className="sst_hero-subtitle">
            <h4> Let top traders do the job for you.</h4>
          </div>
          <div className="sst_hero-title">
            <h1> Experience superior trading conditions!</h1>
          </div>
          <div className="sst_hero-text">
            <p>
            We seek to invest in high-quality, Long-term, structural tailwinds and a strong and sustainable competitive companies that can compound over a multi-year period.
            </p>
          </div>
          {/* <div className="sst_hero-buttons">
            <button>Contact Us</button>
          </div> */}
        </div>
        <div className="sst_herro-right">
          <img src={herobg} />
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
