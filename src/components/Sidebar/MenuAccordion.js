import React, { useState } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import CustomLink from "../Link";
import { FiLogOut } from "react-icons/fi";
import { useBreakpoints } from "react-device-breakpoints";

const MenuAccordion = ({ d, sideBarShow, logout, userRole }) => {
  const [collapse, setCollapse] = useState(false);
  const toggle = (index) => {
    if (collapse === index) {
      return setCollapse(null);
    }
    setCollapse(index);
  };
  const device = useBreakpoints();
  const perRoute = d.filter((rt) => rt?.permission?.includes(userRole));
  // const perRoute = d.filter((rt) => rt?.permission?.includes("admin"));

  return (
    <>
      {perRoute.map((d, i) => (
        <li
          key={d.id}
          className={`ss-trade_sidebar_menu_list ${
            d.dropdown ? "submenu" : ""
          }`}
          id={d.id}
        >
          <CustomLink
            href={d.route}
            onClick={() => {
              toggle(d.id);
              if (!d.dropdown) {
                sideBarShow(true);
              }
            }}
            className="ss-trade_nav_link"
          >
            <div className="icon_text">
              <span>{d.icon}</span>
              <p>{d.menu}</p>
            </div>
            {d.dropdown && (
              <span>
                <RiArrowDropRightLine />
              </span>
            )}
          </CustomLink>
          {collapse === d.id ? (
            <ul>
              {d.dropdown
                ?.filter((pt) => pt?.permission?.includes(userRole)) // here should be "userRole"
                ?.map((drop) => {
                  return (
                    <li key={drop.id}>
                      <CustomLink
                        href={drop.route}
                        className="ss-trade_nav_link dropdown"
                        onClick={() => {
                          sideBarShow(true);
                          device.isTablet && setCollapse(false);
                          // setCollapse(false);
                        }}
                      >
                        {drop.menu}
                      </CustomLink>
                    </li>
                  );
                })}
            </ul>
          ) : null}
        </li>
      ))}
      <li className="ss-trade_sidebar_menu_list" onClick={logout}>
        <CustomLink href="#" className="ss-trade_nav_link">
          <div className="icon_text">
            <span>
              <FiLogOut />
            </span>
            <p>Logout</p>
          </div>
        </CustomLink>
      </li>
    </>
  );
};

export default MenuAccordion;
