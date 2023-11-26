import React from "react";
import "./_loading.scss";
import logo_official from "../../assets/growmorelogo.png";
import logo_official_dark from "../../assets/growmorelogo.png";
import { getLocalStorage } from "../../utils/function/localStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";
const Loading = () => {
  getLocalStorage("dark-mode");
  const [value] = useLocalStorage("dark-mode", "light");

  useEffect(() => {
    if (value === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [value]);
  return (
    <div className='pending_log'>
      {value === "dark" ? (
        <img className='skeleton' src={logo_official_dark} alt='pending'></img>
      ) : (
        <img className='skeleton' src={logo_official} alt='pending'></img>
      )}

      {/* <div className="loading">
        <div className="line-box">
          <div className="line"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Loading;
