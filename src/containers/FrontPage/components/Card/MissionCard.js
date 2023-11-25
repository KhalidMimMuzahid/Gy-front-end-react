import React from "react";

const MissionCard = ({ data }) => {
    return (
        <div className='mission_card'>
            <h4>{data?.id}</h4>
            <h3>{data?.name}</h3>
            <p>{data?.desc}</p>
        </div>
    );
};

export default MissionCard;