import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
const Notification = ({ setOpenNotify }) => {
  return (
    <>
      <ul>
        <div className="header">
          <h4>you have notification</h4>
        </div>
        {[1, 2, 3, 4].map((d) => (
          <li key={d} onClick={() => setOpenNotify(false)}>
            <div className="image">
              <IoMdNotificationsOutline/>
            </div>
            <div className="notification_content">
              <h2>Withdraw Request</h2>
              <p>12 Mar, 2022 - 02:15PM</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notification;
