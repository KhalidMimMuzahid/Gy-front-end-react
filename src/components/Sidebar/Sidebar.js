import React, { useEffect } from "react";
import logoDark from "../../assets/logo.png";
import logoLight from "../../assets/logo-light.png";
import { menus } from "../../utils/tools/menu";
import MenuAccordion from "./MenuAccordion";
import { removeLocalStorage } from "../../utils/function/localStorage";
import { useGetLoginUserQuery } from "../../Services/userApi";

const Sidebar = ({ sideBarShow, theme }) => {
  //getting theme state

  const handleLogout = () => {
    removeLocalStorage("safe_secure_token");
    window.location.reload();
  };
  //using theme value
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [theme]);
  // get user
  const { data } = useGetLoginUserQuery();
  return (
    <div className='ss-trade_sidebar'>
      <div className='ss-trade_logo_container'>
        {theme === "dark" ? (
          <img src={logoDark} width='100%' alt='logo' />
        ) : (
          <img src={logoLight} width='100%' alt='logo' />
        )}
      </div>
      <div className='ss-trade_user_profile'>
        <div className='ss-trade_user_info'>
          <h2>{data?.data?.name}</h2>
          <p>{data?.data?.email}</p>
        </div>
      </div>
      <div className='ss-trade_sidebar_menu'>
        <ul className='ss-trade_sidebar_menu_lists'>
          <MenuAccordion
            d={menus}
            sideBarShow={sideBarShow}
            logout={handleLogout}
            userRole={data?.data?.role}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
