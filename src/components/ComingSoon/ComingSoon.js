import React from "react";
import Header from "../../containers/FrontPage/components/Header";
import Footer from "../../containers/FrontPage/components/Footer";

const ComingSoon = ({ name }) => {
  return (
    <div>
      <Header />
      <div className='net_banking_container'>
        <div className='container'>
          <h2>{name}</h2>
          <div className='typewriter_container'>
            <h1 className='line-1 anim-typewriter'>Coming Soon...</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
