import React from "react";
import SideBarSocialIcon from "../../../../components/SideBarSocialIcon/SideBarSocialIcon";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Particle from "../../components/Particle";

const NetBanking = () => {
  return (
    <div>
      <Header />
      <SideBarSocialIcon />
      <div className="net_banking_container">
        <div className="container">
          <h2>Net Banking</h2>
          <div className="typewriter_container">
            <h1 className="line-1 anim-typewriter">Coming Soon...</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NetBanking;
