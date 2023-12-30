import React from "react";
import WinningAmountHistory from "./Table/WinningAmountTable";
import { IoMdTrophy } from "react-icons/io";
import { useGetMyWinningHistoryQuery } from "../../../Services/earningApi";
import SectionCommonTable from "../../../components/SectionCommonTable";
import RoiIncomeTable from "./Table/RoiIncomeTable";

const MyWinningAmount = () => {
  const { data: MyWinningHistory } = useGetMyWinningHistoryQuery();
  console.log("My Winning History :", MyWinningHistory);
  return (
    <div className='records_table'>
      <div className='table-content'>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle=' My Winning Records'
          table={
            <WinningAmountHistory
              data={MyWinningHistory}
              // showDetails={showDetails}
            />
          }
        />
      </div>
    </div>
  );
};

export default MyWinningAmount;
