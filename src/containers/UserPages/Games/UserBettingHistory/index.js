import React from "react";
import { useGetPredictedQuery } from "../../../../Services/userApi";
import { IoMdTrophy } from "react-icons/io";
import UserSpecificBettingHistory from "../ColorGames/table/UserSpecificBettingHistory";

const UserBettingHistory = () => {
  const { data: predictedData } = useGetPredictedQuery();
  // console.log("Pedicted: ", predictedData);
  return (
    <div>
      <div className='records_table'>
        <div className='table_header'>
          <IoMdTrophy size={50} />
          <p>My Betting Records</p>
        </div>
        <div className='table-content'>
          <UserSpecificBettingHistory data={predictedData?.data} />
        </div>
      </div>
    </div>
  );
};

export default UserBettingHistory;
