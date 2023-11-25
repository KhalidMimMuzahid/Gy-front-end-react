import React from "react";
import email from "../../../../assets/social_icon/email.png";
import telegram from "../../../../assets/social_icon/telegram.png";
import whatsapp from "../../../../assets/social_icon/whatsapp.png";
const Contact = () => {

  return (
    <>
      <div className="ss-trade_front_contact_wrapper" id="contact">
        <div className="landingPage_container container">
          <div className="ss-trade_front_contact_container">
            <div className="title">
              <h2>Contact Us</h2>
            </div>
            <div className="ss-trade_front_contact_form">
              <div className="ss-trade_front_contact_address">
                <a
                  href="mailto:help@Safe & Secure Trade.org"
                  target="_blank"
                  className="address_list"
                  rel="noreferrer"
                >
                  <img src={email} alt="" />
                </a>
                <a
                  href="https://t.me/official14X"
                  target="_blank"
                  className="address_list"
                  rel="noreferrer"
                >
                  <img src={telegram} alt="" />
                </a>
                <a
                  href="https://chat.whatsapp.com/H2rzC1outr2DEVFp7Rcn0n"
                  target="_blank"
                  className="address_list"
                  rel="noreferrer"
                >
                  <img src={whatsapp} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
