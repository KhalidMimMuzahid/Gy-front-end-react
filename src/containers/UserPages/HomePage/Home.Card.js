import React from "react";
const HomeCard = ({
  cardName,
  cardValue,
  link,
  linkText,
  icon,
  bgColor,
  cardBgColor,
  type,
  teamBusiness,
  role,
  goToHistory,
  level,
}) => {
  // Function to lighten a color

  const cardBgGradient = `radial-gradient(circle, rgba(5, 63, 224, 0.651) 0%,,  ${cardBgColor} 100%)`;

  return (
    <div
      className="ss-trade_dash_card_wrapper"
      style={{ background: cardBgColor }}
    >
      <div className="ss-trade_content">
        <div className="ss-trade_widget_info">
          <p>{cardName}</p>
          {!type && <h2>{cardValue}</h2>}
          {type === "level" && (
            <p className="ss-trade_widget_info_text">
              {" "}
              Total Partner: {cardValue}
            </p>
          )}
          {type === "level" && role !== "admin" && (
            <p className="ss-trade_widget_info_text">
              {" "}
              Partner business: ${teamBusiness}
            </p>
          )}
          {/* {type === "level" && role === "admin" && (
            <button onClick={()=> goToHistory()} className="ss-trade_widget_info_text">
              {" "}
              Team business: ${teamBusiness}
            </button>
          )} */}
        </div>
        <div
          className="ss-trade_widget_icon"
          style={{ backgroundColor: bgColor }}
        >
          <img src={icon} style={{ width: "50px", padding: "15px" }} alt="" />
        </div>
      </div>
    </div>
  );
};
export default HomeCard;
