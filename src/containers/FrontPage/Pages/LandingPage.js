import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Particle from "../components/Particle";
import Homes from "../containers/Home";
import Landing from "../../../components/LandingPage/Landing";
import "../../../styles/containers/FrontPage/_landing.scss";
import HomeImage from "../../../assets/Home.png";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../../utils/function/localStorage";
const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  const homeref = useRef(null);
  const missionref = useRef(null);
  const aboutref = useRef(null);
  const servicesref = useRef(null);

  const scrollto = (elementref) => {
    window.scrollTo({
      top: elementref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();
    // check user logged in or not
  let UserLoggedIn = getLocalStorage("grow_more_today_token")

  

  const handleButtonClick = () => {
    // Redirect to the login page
    // auth check
    if (UserLoggedIn) {
      navigate("/dashboard")
      } else {
        navigate("/login");
    }
    
  };
  return (
    <>
      {/* <Header refs={{homeref,missionref,aboutref, servicesref}} scrollTo={scrollto} hidePackageRoute /> */}
      {/* <Homes  refs={{homeref,missionref,aboutref, servicesref}} /> */}
      {/* <Landing/> */}
      <div className="sst_home-banner" style={{ height: "100%" }}>
        <div className="container sst_hero-container">
          <div className="sst_herro-left">
            <div className="sst_hero-title">
              <h1>PLAY </h1>
              <h1> &</h1>
              <h1>WIN </h1>
            </div>
            <div className="sst_hero-subtitle">
              <h4>Earn Unlimited Referrals</h4>
            </div>

            <div className="sst_hero-buttons">
              <button onClick={handleButtonClick}>Start Now</button>
            </div>
          </div>
          <div className="sst_herro-right">
            <img src={HomeImage} />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default LandingPage;
