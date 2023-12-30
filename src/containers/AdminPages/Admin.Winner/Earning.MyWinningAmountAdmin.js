import React from "react";

import { IoMdTrophy } from "react-icons/io";
import { useGetMyWinningHistoryAdminQuery } from "../../../Services/earningApi";
import WinningAmountHistoryAdmin from "./Table/WinningAmountTableAdmin";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useState } from "react";

const MyWinningAmountAdmin = () => {
  const [filterData,setFilterData] = useState([])
  const { data: MyWinningHistoryAdmin } = useGetMyWinningHistoryAdminQuery();
  console.log("My Winning History :", MyWinningHistoryAdmin);
  return (
    <div className='records_table'>
      <div className='table-content'>
      <SectionCommonTable
          wrapperClassName='roi_table'
          setFilterData ={setFilterData}
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle=' All Winning Records'
          table={
            <WinningAmountHistoryAdmin data={MyWinningHistoryAdmin || filterData}
            // showDetails={showDetails}
            
            />
          }
        />
      </div>
    </div>
  );
};

export default MyWinningAmountAdmin;
