import React from "react";
import invest from "../../../../assets/frontpage/invest.svg";
import CustomLink from "../../../../components/Link";
const InvestControl = () => {
  return (
    <div className="ss-trade_front_investsection_wrapper">
      <div className="container">
        <div className="ss-trade_front_invest_container">
          <div className="ss-trade_front_invest_left">
            <h2>Investment Control</h2>
            <p>
              You’re in control of your investment and can withdraw your
              earnings at any time. Many programs offer weekly, monthly or
              quarterly withdrawal – we do them daily!
              <br /><br />
              Whether you’re investing on the side or investing as a means of primary income, this powerful financial technology is shaping the way we think about the concepts of money today
            </p>
            <CustomLink href="/register" className="join_now">
              Join Now
            </CustomLink>
          </div>
          <div className="ss-trade_front_invest_right">
              <img src={invest} alt="invest" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestControl;
