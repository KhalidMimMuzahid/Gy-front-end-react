import React, { useEffect, useRef, useState } from "react";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import avatar from "../../assets/avatar.png";
import logoDark from "../../assets/logo.png";
import logoLight from "../../assets/logo-light.png";
import Popover from "../Popover";
import AvatarDropdownMenu from "./avatarDropdownMenu";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useClickOutside } from "../../hooks/useClickOutside";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../utils/function/localStorage";
import { useGetLoginUserQuery } from "../../Services/userApi";
const Header = ({ show, setShow }) => {
  // avater clckable menu
  const profileRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  useClickOutside(profileRef, () => setOpenMenu(false));
  // mobile show menu
  const [showMenu, setShowMenu] = useState(false);
  getLocalStorage("dark-mode");
  const [value, setValue] = useLocalStorage("dark-mode", "light");
  const handleThemeMode = () => {
    if (value === "dark") {
      setValue("light");
    } else {
      setValue("dark");
    }
  };

  useEffect(() => {
    if (value === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [value]);
  // handle logout
  const handleLogout = () => {
    removeLocalStorage("safe_secure_token");
    window.location.reload();
  };
  // get user
  const { data } = useGetLoginUserQuery();
  return (
    <div className="ss-trade_header_wrapper">
      <div className="container">
        <div className="ss-trade_header_container">
          <div className="ss-trade_hamburger">
            {value === "dark" ? (
              <img
                src={logoDark}
                width="100%"
                className="ss-trade_loog"
                alt="logo"
              />
            ) : (
              <img
                src={logoLight}
                width="100%"
                className="ss-trade_loog"
                alt="logo"
              />
            )}

            <RiBarChartHorizontalLine
              className="hamburger_icon"
              onClick={() => setShow(!show)}
            />
          </div>
          <div className="verticalDots">
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              <BiDotsVerticalRounded />
            </button>
          </div>
          <div className={`ss-trade_header_menu ${showMenu ? "active_show" : ""}`}>
            <ul className="ss-trade_header_menu_lists">
              <li className="ss-trade_header_menu_list">
                <div className="msg_icon theme_icon" id="theme_icon">
                  <button onClick={handleThemeMode} id="theme_icon">
                    {value === "dark" ? <FiSun /> : <MdOutlineDarkMode />}
                  </button>
                </div>
              </li>
              <li ref={profileRef} className="ss-trade_header_menu_list">
                <img
                  src={data?.data?.avatar ? data?.data?.avatar : avatar}
                  alt="user_pic"
                  onClick={() => setOpenMenu(!openMenu)}
                />
                <Popover openPopover={openMenu} className="clickable_submenu">
                  <AvatarDropdownMenu
                    setOpenMenu={setOpenMenu}
                    logout={handleLogout}
                    data={data?.data}
                  />
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
