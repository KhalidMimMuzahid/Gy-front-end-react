import React from "react";
import MissionCard from "../../components/Card/MissionCard";
import { missions } from "../../components/Card/missiondata";

const Mission = () => {
    return (
        <div className='mission_container'>
            <div className="container">
                <div className="mission_inner">
                    <div>
                        <h2>Our Mission</h2>
                    </div>
                    <div className="mission_box">
                        {missions?.map((d) => <MissionCard key={d?.id} data={d} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mission;
