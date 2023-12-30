import React from "react";
import { useGetPredictedQuery } from "../../../../Services/userApi";
import UserSpecificBettingHistory from "../ColorGames/table/UserSpecificBettingHistory";
import SectionCommonTable from "../../../../components/SectionCommonTable";

const UserBettingHistory = () => {
  const { data: predictedData } = useGetPredictedQuery();
  console.log("Pedicted: ", predictedData);
  return (
    <div>
      <div className='records_table'>
        <div className='table-content'>
          <SectionCommonTable
            wrapperClassName='roi_table'
            cardStyle={{ backgroundColor: "#fff" }}
            sectionTableTitle=' My Betting History'
            table={
              <UserSpecificBettingHistory
                data={predictedData?.data}
                // showDetails={showDetails}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserBettingHistory;
