import React from "react";
import i1 from "../../../../assets/avatar.png"
import { BsChevronRight } from "react-icons/bs";

const DoCard = ({ data }) => {
    return (
        <div className='do_card'>
            <p className="left_icon">{data?.icon}</p>
            <h3>{data?.name}</h3>
            <p className="right_icon"><BsChevronRight size={20} color="#fff" /></p>
        </div>
    );
};

export default DoCard;