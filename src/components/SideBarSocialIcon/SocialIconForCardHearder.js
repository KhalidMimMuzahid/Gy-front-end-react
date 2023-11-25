import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const SocialIconForCardHearder = () => {
  return (
    <div className="login_page_social_icon">
      <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
        <AiOutlineWhatsApp className="social_icon twitter" />
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillFacebook className="social_icon facebook" />
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillInstagram className="social_icon instagram" />
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillYoutube className="social_icon youtube" />
      </a>
    </div>
  );
};

export default SocialIconForCardHearder;
