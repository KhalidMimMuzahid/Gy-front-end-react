import React from 'react'
import WinningAmountHistory from './Table/WinningAmountTable'
import { IoMdTrophy } from 'react-icons/io';
import { useGetMyWinningHistoryQuery } from '../../../Services/earningApi';

const MyWinningAmount = () => {
    const { data: MyWinningHistory } = useGetMyWinningHistoryQuery();
  // console.log("My Winning History :",MyWinningHistory);
  return (
    <div className='records_table'>
        <div className='table_header'>
          <IoMdTrophy size={50} />
          <p>My Winning Records</p>
        </div>
        <div className='table-content'>
          <WinningAmountHistory data={MyWinningHistory} />
        </div>
      </div>
  )
}

export default MyWinningAmount