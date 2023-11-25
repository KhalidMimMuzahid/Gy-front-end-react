import React from "react";
import HomeCard from "../../UserPages/HomePage/Home.Card";
import totalUserIcon from "../../../assets/dashboardIcon/team.png";
import blockUserIcon from "../../../assets/dashboardIcon/block-user.png";
import activeUserIcon from "../../../assets/dashboardIcon/active-user.png";
import totalInvestmentIcon from "../../../assets/dashboardIcon/invest.png";
import { useGetAllUserStatisticsQuery } from "../../../Services/userApi";
import Loading from "../../../components/Loading/Loading";

const AdminHome = () => {
  const { data, isLoading } = useGetAllUserStatisticsQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="ss-trade_adminHome_wrapper">
      <div className="ss-trade_section_title">
        <h2>Dashboard</h2>
      </div>
      <div className="ss-trade_dash_content_item">
        <div className="ss-trade_dash_content card_row">
          <HomeCard
            cardName="Total User"
            cardValue={data?.data?.alluser ? data?.data?.alluser : "0"}
            icon={totalUserIcon}
            linkText="view details"
            bgColor="#FF87B2"
            cardBgColor="#fe9f43"
          />
          <HomeCard
            cardName="Total Active User"
            cardValue={data?.data?.activeUsers ? data?.data?.activeUsers : "0"}
            icon={activeUserIcon}
            linkText="view details"
            bgColor="#ffbd5a"
            cardBgColor="#00d0e7"
          />
          <HomeCard
            cardName="Total Inactive User"
            cardValue={data?.data?.inactiveUsers ? data?.data?.inactiveUsers : "0"}
            icon={activeUserIcon}
            linkText="view details"
            bgColor="#ffbd5a"
            cardBgColor="#00d0e7"
          />
          <HomeCard
            cardName="Blocked User"
            cardValue={
              data?.data?.blockedUsers ? data?.data?.blockedUsers : "0"
            }
            icon={blockUserIcon}
            linkText="view details"
            bgColor="#ffbd5a"
            cardBgColor="#28c66f"
          />
          <HomeCard
            cardName="Total Investment"
            cardValue={`₹ ${
              data?.data?.totalInvestmentAmount
                ? parseFloat(data?.data?.totalInvestmentAmount)?.toFixed(4)
                : "0"
            }`}
            icon={totalInvestmentIcon}
            linkText="view details"
            bgColor="#f74f75"
            cardBgColor="#00d0e7"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
