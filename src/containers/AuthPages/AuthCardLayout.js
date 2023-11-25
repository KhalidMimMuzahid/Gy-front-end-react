import React from "react";

const AuthCardLayout = ({ children, style, className }) => {
  return <div className={`ss-trade_all_Auth_card ${className}`} style={style}>{children}</div>;
};

export default AuthCardLayout;
