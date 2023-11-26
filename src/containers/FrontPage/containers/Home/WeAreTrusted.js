import React from "react";
import ic1 from "../../../../assets/icon-1.svg";
import ic2 from "../../../../assets/icon-2.svg";
import ic3 from "../../../../assets/icon-3.svg";
import ic4 from "../../../../assets/icon-4.svg";

const WeAreTrusted = () => {
  return (
    <div className='trusted_container'>
    <div className="container">
    <div className="trust_innerbody">
        <div className="trusted_left">
          <h2>Why Grow More is a trusted FX broker?</h2>
          <p>We provide significant support to management teams in developing and executing their business plans. In addition to our deal team, which is involved throughout the life of an investment, we draw on operating resources from our in-house Portfolio Support Group and third-party Operating Partner program. These combined resources underpin our highly operational approach to investing.</p>
        </div>
        <div className="trusted_right">
          <div className="feat_box">
            <div className="feat">
              <img src={ic1} alt="feat" />
              <h4>Differentiated sourcing and diligence driving a high-quality</h4>
            </div>
            <div className="feat">
              <img src={ic2} alt="feat" />
              <h4>High conviction portfolio</h4>
            </div>
          </div>
          <div className="feat_box">
          <div className="feat">
              <img src={ic3} alt="feat" />
              <h4>Backing great businss to build a better tomorrow</h4>
            </div>
            <div className="feat">
              <img src={ic4} alt="feat" />
              <h4>Leveraging Grow more expertise across our 5 core sectors</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WeAreTrusted;
