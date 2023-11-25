import React from "react";

const Drawer = ({ children, className, openDrawer, setOpenDrawer }) => {
  return (
    <>
      <>
        <div
          className={`ss-trade_drawer ${className} ${openDrawer ? "active" : ""}`}
        >
          {children}
        </div>
        {openDrawer && (
          <div
            className="backdrop"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              background: "#0000002e",
              width: "100%",
              height: "100%",
              zIndex: "9999",
              cursor: "pointer",
            }}
            onClick={() => setOpenDrawer(false)}
          ></div>
        )}
      </>
    </>
  );
};

export default Drawer;
