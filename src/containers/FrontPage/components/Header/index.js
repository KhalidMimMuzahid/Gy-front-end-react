import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../../../assets/growmorelogo.png";
import CustomLink from "../../../../components/Link";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../../../utils/function/localStorage";
const Header = ({ hidePackageRoute, refs, scrollTo }) => {
  const [stickyNav, setStickyNav] = useState(false);
  const stickyNavbar = () => {
    if (window.pageYOffset > 100) {
      setStickyNav(true);
      return;
    } else {
      setStickyNav(false);
      return;
    }
  };
  const handleLogout = () => {
    removeLocalStorage("grow_more_today_token");
    window.location.reload();
  };
  window.addEventListener("scroll", stickyNavbar);
  const [showToggleNav, setShowToggleNav] = useState(false);
  function getCurrentRoute() {
    return window.location.pathname;
  }

  // Example usage
  const currentRoute = getCurrentRoute();

  return (
    <div
      className={`ss-trade_frontpage_header_wrapper ${
        stickyNav ? "sticky" : ""
      }`}
    >
      <div className="container">
        <div className="ss-trade_front_navbar">
          <div className="toggler_icon">
            <FaBars onClick={() => setShowToggleNav(!showToggleNav)} />
          </div>
          <div className="ss-trade_front_logo">
            <CustomLink href="/" className="logo">
              <img src={logo} alt="logo" />
              {/* <h2 style={{padding: "15px"}}>Safe & Secure Trade</h2> */}
            </CustomLink>
            <ul className="ss-trade_front_navbar_lists2">
              {getLocalStorage("grow_more_today_token") ? (
                <li className="ss-trade_front_navbar_list2 ">
                  <CustomLink
                    href="/dashboard"
                    className="ss-trade_front_nav_link2 ss-trade_front_navbar_dashboard"
                  >
                    Dashboard
                  </CustomLink>
                </li>
              ) : (
                <li className="ss-trade_front_navbar_list2">
                  <CustomLink
                    href="/login"
                    className="ss-trade_front_nav_link2 login2"
                  >
                    Login
                  </CustomLink>
                </li>
              )}
              {getLocalStorage("grow_more_today_token") ? (
                <li
                  className="ss-trade_front_navbar_list2"
                  onClick={handleLogout}
                >
                  <CustomLink
                    href="/login"
                    className="ss-trade_front_nav_link2 ss-trade_front_navbar_logOut"
                  >
                    Logout
                  </CustomLink>
                </li>
              ) : (
                <li className="ss-trade_front_navbar_list2">
                  <CustomLink
                    href="/register"
                    className="ss-trade_front_nav_link2 register2"
                  >
                    Register
                  </CustomLink>
                </li>
              )}
            </ul>
          </div>
          <div
            className={`ss-trade_front_navbar_menu ${
              showToggleNav ? "toggle_navbar" : ""
            }`}
          >
            <ul className="ss-trade_front_navbar_lists">
              <li
                onClick={() => currentRoute === "/" && scrollTo(refs?.homeref)}
                className="ss-trade_front_navbar_list"
              >
                <CustomLink className="ss-trade_front_nav_link">
                  Home
                </CustomLink>
              </li>
              <li
                onClick={() => currentRoute === "/" && scrollTo(refs?.aboutref)}
                className="ss-trade_front_navbar_list"
              >
                <CustomLink className="ss-trade_front_nav_link">
                  About
                </CustomLink>
              </li>
              <li
                onClick={() =>
                  currentRoute === "/" && scrollTo(refs?.servicesref)
                }
                class="ss-trade_front_navbar_list"
              >
                <CustomLink className="ss-trade_front_nav_link">
                  Services
                </CustomLink>
              </li>
              <li className="ss-trade_front_navbar_list">
                <CustomLink href="/planPDF" className="ss-trade_front_nav_link">
                  Business PDF
                </CustomLink>
              </li>
              {getLocalStorage("grow_more_today_token") ? (
                <li className="ss-trade_front_navbar_list register">
                  <CustomLink
                    href="/dashboard"
                    className="ss-trade_front_nav_link"
                  >
                    Dashboard
                  </CustomLink>
                </li>
              ) : (
                <li className="ss-trade_front_navbar_list login">
                  <CustomLink href="/login" className="ss-trade_front_nav_link">
                    Login
                  </CustomLink>
                </li>
              )}
              {getLocalStorage("grow_more_today_token") ? (
                <li
                  className="ss-trade_front_navbar_list login"
                  onClick={handleLogout}
                >
                  <CustomLink href="/login" className="ss-trade_front_nav_link">
                    Logout
                  </CustomLink>
                </li>
              ) : (
                <li className="ss-trade_front_navbar_list register">
                  <CustomLink
                    href="/register"
                    className="ss-trade_front_nav_link"
                  >
                    Register
                  </CustomLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
