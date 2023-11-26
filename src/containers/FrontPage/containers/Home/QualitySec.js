import React from "react";
import qc from "../../../../assets/heroImg.png";

const QualitySection = () => {
  return (
    <div className="quality_container">
      <div className="container">
        <div className="quality_inner">
          <div className="quality_left">
            <h2>We focus on Our Quality</h2>
            <p>
              We seek to invest in high-quality companies that can compound over
              a multi-year period. We look for businesses with:
            </p>

            <p>
              Long-term, structural tailwinds and a strong and sustainable
              competitive position Business models with sticky customer
              relationships, large economic moat, and ultimately, pricing power
              Incentivized management teams with a history of successful
              execution
            </p>
          </div>
          <div className="quality_right">
            <img src={qc} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualitySection;
