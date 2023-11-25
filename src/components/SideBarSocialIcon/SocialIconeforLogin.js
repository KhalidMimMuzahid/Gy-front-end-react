import React from "react";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { RiTelegramLine, RiPinterestFill } from "react-icons/ri";

const SocialIconeforLogin = () => {
  return (
    <div className="home_page_side_bar home_page_side_bar_for_login_page">
     <a
        href=""
        target="_blank"
        className="all_social_icon instagram"
        rel="noreferrer"
      >
        Follow <AiOutlineInstagram className="social_icon " />
      </a>
      <a
        href=""
        target="_blank"
        className="all_social_icon facebook"
        rel="noreferrer"
      >
        Follow <AiFillFacebook className="social_icon " />
      </a>

      <a
        href=""
        target="_blank"
        className="all_social_icon youtube"
        rel="noreferrer"
      >
        Follow <AiFillYoutube className="social_icon " />
      </a>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="all_social_icon telegram"
      >
        Follow <RiTelegramLine className="social_icon " />
      </a>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="all_social_icon whatsapp"
      >
        Follow <AiOutlineWhatsApp className="social_icon " />
      </a>
    </div>
  );
};

export default SocialIconeforLogin;
