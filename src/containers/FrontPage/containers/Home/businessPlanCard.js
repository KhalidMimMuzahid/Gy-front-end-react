import React from "react";
import { BusinessCard } from "../../../../utils/tools/frontBusinessCard";

const BusinessPlanCard = ({ className }) => {
  return (
    <div className={`ss-trade_front_businesscard_wrapper ${className}`}>
      <div className="">
        <h2 className="service_title">OUR SERVICE</h2>
      </div>
      <div className="landingPage_container container">
        <div className="ss-trade_front_business_card">
          {BusinessCard.map((d, i) => (
            <div key={i + 1} className="ss-trade_front_card">
              <div className="card_img">
                <img src={d.img} width="100%" alt="vision" />
              </div>
              <div className="card_title">
                <h2>{d.title}</h2>
              </div>
              <div className="card_desc">
                <p>{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanCard;
