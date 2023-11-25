import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Particle from "../components/Particle";
import Homes from "../containers/Home";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  const homeref = useRef(null);
  const missionref = useRef(null);
  const aboutref = useRef(null);
  const servicesref = useRef(null);

  const scrollto = (elementref) => {
    window.scrollTo({
      top: elementref.current.offsetTop-100,
      behavior: 'smooth',
    })
  }
  return (
    <>
      <Header refs={{homeref,missionref,aboutref, servicesref}} scrollTo={scrollto} hidePackageRoute />
      <Homes  refs={{homeref,missionref,aboutref, servicesref}} />
      <Footer />
    </>
  );
};

export default Home;
