import React from "react";
import { useGetPredictedQuery, useGetperiodIDQuery } from "../../../../Services/userApi";
import SectionCommonTable from "../../../../components/SectionCommonTable";
import UsersCurrentPeriodBetting from "../ColorGames/table/UsersCurrentPeriodBetting";

const UserCurrentPeriodBettingHistory = () => {
  const { data: predictedData } = useGetPredictedQuery();
  console.log("Pedicted: ", predictedData);
  const { data: periodData, refetch } = useGetperiodIDQuery();
  console.log("current period running now:",periodData)
  return (
    <div>
      <div className='records_table'>
        <div className='table-content'>
          <SectionCommonTable
            wrapperClassName='roi_table'
            cardStyle={{ backgroundColor: "#fff" }}
            sectionTableTitle=' My Game On Current Period'
            table={
              <UsersCurrentPeriodBetting
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

export default UserCurrentPeriodBettingHistory;
