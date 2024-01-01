import React from "react";
import HomeCard from "../HomePage/Home.Card";
import levelIncome from "../../../assets/dashboardIcon/level.png";
import totalIncome from "../../../assets/dashboardIcon/income.png";
import BoosterIncome from "../../../assets/dashboardIcon/booster_income.png";
import InDirectIncome from "../../../assets/dashboardIcon/indriectincome.png";
import DirectIncome from "../../../assets/dashboardIcon/direct_income.png";
import withdrawIncome from "../../../assets/dashboardIcon/withdraw_income.png";
import { useGetAllWalletQuery } from "../../../Services/walletApi";
import Loading from "../../../components/Loading/Loading";

const Wallet = () => {
  const { data, isLoading } = useGetAllWalletQuery();
  if (isLoading) {
    return <Loading />;
  }
  const totalBalance = data?.data?.investmentAmount + data?.data?.activeIncome;
  console.log({ totalBalance });
  console.log({ data });
  return (
    <div className='wallet_page_wrapper'>
      <div className='ss-trade_dash_content card_row'>
        <HomeCard
          cardName='Total Income'
          cardValue={`₹${
            data?.data?.totalBalance
              ? Number(data?.data?.totalBalance).toFixed(4)
              : "0"
          }`}
          icon={totalIncome}
          bgColor='#6C4AB6'
          cardBgColor='#F7941D'
        />
        <HomeCard
          cardName='Withdrawal Ballance'
          cardValue={`₹${
            data?.data?.activeIncome
              ? Number(data?.data?.activeIncome).toFixed(4)
              : "0"
          }`}
          icon={totalIncome}
          bgColor='#6C4AB6'
          cardBgColor='#0087F6'
        />
        <HomeCard
          cardName='Self Investment'
          cardValue={`₹${
            totalBalance ? parseFloat(totalBalance).toFixed(4) : "0"
          }`}
          icon={BoosterIncome}
          bgColor='#38cab3'
          cardBgColor='#F7941D'
        />
        <HomeCard
          cardName='Deposit Balance'
          cardValue={`₹${
            data?.data?.depositBalance
              ? parseFloat(data?.data?.depositBalance).toFixed(4)
              : "0"
          }`}
          icon={withdrawIncome}
          bgColor='#9ED5C5'
          cardBgColor='#0087F6'
        />
        
        
      </div>
    </div>
  );
};

export default Wallet;
