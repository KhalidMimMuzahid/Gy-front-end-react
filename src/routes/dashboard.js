import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { getLocalStorage } from "../utils/function/localStorage";
import AppContent from "./appContent";

const Dashboard = () => {
  // add custom attribute on body tag
  const [show, setShow] = useState(true);
  return (
    <>
      {/* <BrowserRouter> */}
      <div className="home_wrapper" show-menu={show ? "false" : "true"}>
        {/* sidebar */}
        <div className="sidebar_wrapper">
          <Sidebar
            sideBarShow={setShow}
            theme={JSON.parse(getLocalStorage("dark-mode"))}
          />
        </div>
        {!show && (
          <div
            className="menu_backdrop"
            style={{
              position: "fixed",
              backgroundColor: "#0000001c",
              width: "100%",
              height: "100%",
              zIndex: "9999",
            }}
            onClick={() => setShow(true)}
          ></div>
        )}
        {/* body container */}
        <div className="body_content_wrapper">
          {/* header */}
          <Header setShow={setShow} show={show} />
          <div
            className="content_wrapper"
            style={{
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Routers for every page render on the UI */}
            <AppContent />
          </div>
          <Footer />
        </div>
      </div>
      {/* </BrowserRouter> */}
    </>
  );
};

export default Dashboard;
