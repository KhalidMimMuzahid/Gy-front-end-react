import React from "react";
import CustomLink from "../Link";
import { FiLogOut } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
const AvatarDropdownMenu = ({ setOpenMenu, logout, data }) => {
  return (
    <>
      <ul className="submenu">
        <div className="header">
          <div className="img">
            <img src={data?.avatar ? data?.avatar : avatar} alt="img" />
          </div>
          <div className="name">
            <h4>{data?.fullName}</h4>
            <p>{data?.userId}</p>
          </div>
        </div>
        {data?.role === "user" ? (
          <>
            <li className="submenu_list_static">
              <h4>{"joining date"}</h4>
              <p>{data?.joiningDate}</p>
            </li>
            {data?.activationDate && (
              <li className="submenu_list_static">
                <h4>{"Activation Date"}</h4>
                {
                  <p>
                    {data?.activationDate ? data?.activationDate : ""}
                  </p>
                }
              </li>
            )}
          </>
        ) : null}
        <li className="submenu_list" onClick={() => setOpenMenu(false)}>
          <CustomLink href="#" onClick={logout} className="submenu_link">
            <FiLogOut />
            &nbsp; Logout
          </CustomLink>
        </li>
      </ul>
    </>
  );
};

export default AvatarDropdownMenu;