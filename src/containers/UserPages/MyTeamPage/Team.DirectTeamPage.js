import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import DirectTable from "./table/directTable";
import { useGetDirectTeamQuery } from "../../../Services/userApi";
import Loading from "../../../components/Loading/Loading";
import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";
import icon from "../../../assets/dashboardIcon/directTeam.png";

const DirectTeamPage = () => {
  const { data, isLoading } = useGetDirectTeamQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <><div className='UserEarning_wallet_page_wrapper'>
      <div className='UserEarning_dash_content card_row'>
        <UserIncomeCard
          cardName='Total Referral'
          cardValue={`${data?.level?.length || "0"
            }`}
          icon={icon}
          bgColor='#38cab3'
          linkText='view details'
          cardBgColor='#00d0e7'
        />
      </div>
      <SectionCommonTable
        wrapperClassName="directteam_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="My Referral"
        table={<DirectTable data={data} />}
      />
    </div>
    </>
  );
};

export default DirectTeamPage;
