import React from "react";
import SectionCommonTable from "../../../../components/SectionCommonTable";
import UsersCurrentPeriodBetting from "../ColorGames/table/UsersCurrentPeriodBetting";

const UserCurrentPeriodBettingHistory = ({
  predictedDataForCurrrentPeriod,
}) => {
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
                data={predictedDataForCurrrentPeriod?.data}
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
