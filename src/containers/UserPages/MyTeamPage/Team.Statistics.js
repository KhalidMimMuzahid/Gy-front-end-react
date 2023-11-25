import React, { useEffect, useState } from "react";
import team from "../../../assets/dashboardIcon/team2.png";
import directTeam from "../../../assets/dashboardIcon/directTeam.png";
import roiIcon from "../../../assets/dashboardIcon/roi.png";
import userListIcon from "../../../assets/dashboardIcon/level.png";
import teamIcon from "../../../assets/dashboardIcon/team.png";
import totalActiveTeam from "../../../assets/dashboardIcon/totalactiveTeam.png";
import {
  useGetLoginUserQuery,
  useGetTeamBusinessQuery,
} from "../../../Services/userApi";
import CardLayout from "../../../components/CardLayout";
import HomeCard from "../HomePage/Home.Card";

const UserTeamStatistics = () => {
  const { data: loginUserData } = useGetLoginUserQuery();
  const { data: teamBusinesData } = useGetTeamBusinessQuery();

  return (
    <div className="tp_updatepassword_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="tp_accountpassword_card"
      >
        <div className="team_over_view">
          <h2>User Info</h2>
          <div className="tp_dash_content_item">
            <div className="tp_dash_content card_row">
              {teamBusinesData?.data?.map((d, i) => (
                <HomeCard
                  key={i + 1}
                  cardName={d?.level == 1 ? "Direct Team" : `Level ${d?.level}`}
                  cardValue={d?.totalTeam}
                  teamBusiness={d?.totalBusinessAmount}
                  icon={totalActiveTeam}
                  bgColor="#42855B"
                  cardBottom={true}
                  cardBgColor="#28c66f"
                  type="level"
                />
              ))}
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default UserTeamStatistics;
