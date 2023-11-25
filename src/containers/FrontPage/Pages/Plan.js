import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import IncomeTypes from "../containers/IncomeTypes";
const Plan = () => {
  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);
  return (
    <>
      <Header />
      <IncomeTypes />
      <Footer />
    </>
  );
};

export default Plan;
