import React from "react";
import DoCard from "../../components/Card/Docard";
import {ImStatsBars} from "react-icons/im";
import {GiHealthIncrease,GiGears} from "react-icons/gi";
import {BsFillBagCheckFill,BsShare} from "react-icons/bs";

const OurCoreServices = ({refset}) => {

  const srvs = [
    {
        id: 1,
        name: "Business and financial services",
        icon: <ImStatsBars/>,
    },
    {
        id: 2,
        name: "Healthcare",
        icon: <GiHealthIncrease/>,
    },
    {
        id: 3,
        name: "Industrial",
        icon: <GiGears/>,
    },
    {
        id: 4,
        name: "Retail, consumer and leisure",
        icon: <BsFillBagCheckFill/>,
    },
    {
        id: 5,
        name: "Technology",
        icon: <BsShare/>,
    },
]
  return (
    <div ref={refset} className="wedo_container">
      <div className="container">
        <div className="wedo_inner">
          <div className="wedo_header">
            <h2>What We Do?</h2>
            <p>We invest in five core sectors where we have subtantial experience and depp local and international knowledge.</p>
          </div>
          <div className="wedo_cards">
            {srvs?.map((d)=> <DoCard key={d?.id} data={d} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCoreServices;
