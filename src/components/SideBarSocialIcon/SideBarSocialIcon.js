import React from "react";
import {
  AiFillFacebook,
  // AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
  // AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { RiTelegramLine, RiPinterestFill } from "react-icons/ri";

const SideBarSocialIcon = () => {
  return (
    <div className="home_page_side_bar">
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
      {/* <a
        href="https://www.linkedin.com/in/tronlive-club-b0802824b/"
        target="_blank"
        className="all_social_icon linkedin"
        rel="noreferrer"
      >
        Follow <AiFillLinkedin className="social_icon " />
      </a>
      <a
        href="https://in.pinterest.com/tronlive_club/"
        target="_blank"
        className="all_social_icon interest"
        rel="noreferrer"
      >
        Follow <RiPinterestFill className="social_icon " />
      </a>
      <a
        href="https://twitter.com/TronLive_club"
        target="_blank"
        className="all_social_icon twitter"
        rel="noreferrer"
      >
        Follow <AiOutlineTwitter className="social_icon " />
      </a> */}
    </div>
  );
};
export default SideBarSocialIcon;
