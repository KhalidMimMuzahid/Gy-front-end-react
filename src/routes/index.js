import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../containers/AuthPages/Login";
import Register from "../containers/AuthPages/Register";
import ForgotPassword from "../containers/AuthPages/ForgotPassword";
import Dashboard from "./dashboard";
import FrontPage from "./frontPage";
import ResetPassword from "../containers/AuthPages/ResetPassword";
import TermsConditions from "../containers/AuthPages/TermsConditions";
import NetBanking from "../containers/FrontPage/containers/CommingSoon/NetBanking";
import UtilityService from "../containers/FrontPage/containers/CommingSoon/UtilityServices";
import TradeProfit from "../containers/FrontPage/containers/CommingSoon/TradeProfit";
import ShoppingProfit from "../containers/FrontPage/containers/CommingSoon/ShoppingProfit";
import VerifyUser from "../containers/AuthPages/VerifyUser";
// import Page404 from "../containers/Page404NotFound/Page404";

const Routers = () => {
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/*" index element={<FrontPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/:token" element={<VerifyUser />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/termsconditions" element={<TermsConditions />} />
        <Route path="/netbanking" element={<NetBanking />} />
        <Route path="/tradeprofit" element={<TradeProfit />} />
        <Route path="/utilityservice" element={<UtilityService />} />
        <Route path="/shoppingprofit" element={<ShoppingProfit />} />
        {/* <Route path="*" element={<Page404/>} /> */}
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
};

export default Routers;
