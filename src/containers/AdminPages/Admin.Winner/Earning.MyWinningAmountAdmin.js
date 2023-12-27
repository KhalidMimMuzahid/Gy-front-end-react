import React from "react";

import { IoMdTrophy } from "react-icons/io";
import { useGetMyWinningHistoryAdminQuery } from "../../../Services/earningApi";
import WinningAmountHistoryAdmin from "./Table/WinningAmountTableAdmin";

const MyWinningAmountAdmin = () => {
  const { data: MyWinningHistoryAdmin } = useGetMyWinningHistoryAdminQuery();
  console.log("My Winning History :", MyWinningHistoryAdmin);
  return (
    <div className='records_table'>
      <div className='table_header'>
        <IoMdTrophy size={50} />
        <p>All Winning Records</p>
      </div>
      <div className='table-content'>
        <WinningAmountHistoryAdmin data={MyWinningHistoryAdmin} />
      </div>
    </div>
  );
};

export default MyWinningAmountAdmin;
