import React from "react";

import { RiTelegramLine, RiWhatsappLine } from "react-icons/ri";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="ss-trade_front_footer_wrapper">
      <div className="container">
        <footer className="footer-container">
          <p style={{ color: "#fff !important" }}>
            Copyright © 2023-2040, Powered By{" "}
            <a href="https://growmore.com">GrowMore.com</a>{" "}
          </p>
          {/* <div className="content">
            <ul className="social_link">
              <li>
                <a
                  className="footer_menu"
                  rel="noreferrer"
                  href="https://t.me/"
                  target="_blank"
                >
                  <RiTelegramLine className="telegram" />{" "}
                </a>
              </li>
              <li>
                <a
                  className="footer_menu"
                  rel="noreferrer"
                  href="https://chat.whatsapp.com/"
                  target="_blank"
                >
                  <RiWhatsappLine className="whatsapp" />{" "}
                </a>
              </li>
              <li>
                <a
                  className="footer_menu"
                  rel="noreferrer"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  <FaFacebook className="facebook" />{" "}
                </a>
              </li>
              <li>
                <a
                  className="footer_menu"
                  rel="noreferrer"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  <FaInstagramSquare className="instagram" />{" "}
                </a>
              </li>
            </ul>
          </div> */}
        </footer>
      </div>
    </div>
  );
};

export default Footer;
