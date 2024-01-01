import React from "react";

import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";
import roiIncomeIcon from "../../../assets/dashboardIcon/roi.png";
import Loading from "../../../components/Loading/Loading";
import { useGetAllWalletQuery } from "../../../Services/walletApi";

const Earning = () => {
  const { data, isLoading } = useGetAllWalletQuery();
  if (isLoading) {
    return <Loading />;
  }
  console.log(data.data);

  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <div className='UserEarning_dash_content card_row'>
          <UserIncomeCard
            cardName='ROI Income'
            cardValue={`₹${
              data?.data?.roiIncome || 0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Level ROI'
            cardValue={`₹${
              data?.data?.levelROI
              || 0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Winning Amount'
            cardValue={`₹${
              data?.data?.winingAmount || 0
              
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Winning From Level'
            cardValue={`₹${
              data?.data?.winingFromLevel || 0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
        </div>
      </div>
    </>
  );
};

export default Earning;
