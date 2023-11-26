import React from "react";
import tronImage from "../../../../assets/tron_live.png"
const About = ({refset}) => {
  return (
    <div ref={refset} className="about_container" id="home">
      <div className="container">
        <div className="about_inner">
          <div className="about_left">
            <h2>About Us</h2>
            <p>Grow More is one of the largest and longest serving independent private equity partnerships. Since our founding in 2016, we have invested  investments across 5 countries. While every company is different, our hands-on approach to helping these businesses flourish has remained a constant. </p>

            <p>Ours is a long-term business built on trust, and we take great care to protect and enhance the open, honest and inclusive culture that will always define Grow More International.</p>
          </div>
          <div className="about_right"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
