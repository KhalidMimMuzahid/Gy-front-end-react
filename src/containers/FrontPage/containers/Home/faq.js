import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FAQs } from "../../../../utils/tools/frontfaq";
const FAQ = () => {
  const [collapse, setCollapse] = useState(false);
  const toggle = (index) => {
    if (collapse === index) {
      return setCollapse(null);
    }
    setCollapse(index);
  };
  return (
    <div className="ss-trade_front_faq_wrapper">
      <div className="landingPage_container container">
        <div className="title">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="ss-trade_front_accordion_lists">
          {FAQs.map((d) => (
            <div
              key={d.id}
              className="ss-trade_accordion_card"
            >
              <div className="ques" onClick={() => toggle(d.id)}>
                <h2>{d.ques}</h2>
                <span>
                  {collapse === d.id ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </span>
              </div>
              {collapse === d.id ? (
                <div className="ans">
                  <p>{d.ans}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
