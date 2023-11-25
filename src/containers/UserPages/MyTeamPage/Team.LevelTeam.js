import React, { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useLevelTeamListQuery } from "../../../Services/userApi";
import LevelTeam from "./table/levelTeam";
import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";

import icon from "../../../assets/dashboardIcon/directTeam.png";

const LevelTeamHistory = () => {
  const { data, isLoading } = useLevelTeamListQuery();
  const [allTeamSearch, setAllTeamSearch] = useState([]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <div className='UserEarning_dash_content card_row'>
          <UserIncomeCard
            cardName='Total Level Partner'
            cardValue={`${data?.level?.length || "0"
              }`}
            icon={icon}
            bgColor='#38cab3'
            linkText='view details'
            cardBgColor='#00d0e7'
          />
        </div>
        <SectionCommonTable
          dataTeam={data?.level}
          setAllTeamSearch={setAllTeamSearch}
          wrapperClassName="levelteam_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle="Level Partner"
          table={<LevelTeam data={allTeamSearch?.length >= 0 ? allTeamSearch : data?.level} />}
        />
      </div>
    </>
  );
};

export default LevelTeamHistory;
