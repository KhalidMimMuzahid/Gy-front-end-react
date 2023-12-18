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
    <div className="wallet_page_wrapper">
      <div className="ss-trade_dash_content card_row">
        <HomeCard
          cardName="Total Balance"
          cardValue={`₹${
            data?.data?.totalBalance
              ? Number(data?.data?.totalBalance).toFixed(4)
              : "0"
          }`}
          icon={totalIncome}
          bgColor="#6C4AB6"
          cardBgColor="#fe9f43"
        />
        <HomeCard
          cardName="Active Income"
          cardValue={`₹${
            data?.data?.activeIncome
              ? Number(data?.data?.activeIncome).toFixed(4)
              : "0"
          }`}
          icon={totalIncome}
          bgColor="#6C4AB6"
          cardBgColor="#fe9f43"
        />
        <HomeCard
          cardName="Self Investment"
          cardValue={`₹${
            totalBalance ? parseFloat(totalBalance).toFixed(4) : "0"
          }`}
          icon={BoosterIncome}
          bgColor="#38cab3"
          cardBgColor="#00d0e7"
        />
        <HomeCard
          cardName="Main Wallet"
          cardValue={`₹${
            data?.data?.totalIncome
              ? Number(data?.data?.totalIncome).toFixed(4)
              : "0"
          }`}
          icon={totalIncome}
          bgColor="#6C4AB6"
          cardBgColor="#fe9f43"
        />
        <HomeCard
          cardName="Direct Income"
          cardValue={`₹${
            data?.data?.directIncome
              ? Number(data?.data?.directIncome).toFixed(4)
              : "0"
          }`}
          icon={totalIncome}
          bgColor="#6C4AB6"
          cardBgColor="#fe9f43"
        />
        <HomeCard
          cardName="Profit Share"
          cardValue={`₹${
            data?.data?.levelIncome
              ? Number(data?.data?.levelIncome).toFixed(4)
              : "0"
          }`}
          icon={DirectIncome}
          linkText="view details"
          bgColor="#38cab3"
          cardBgColor="#00d0e7"
        />
        <HomeCard
          cardName=" Actinic Bonus"
          cardValue={`₹${
            data?.data?.roiIncome
              ? parseFloat(data?.data?.roiIncome).toFixed(4)
              : "0"
          }`}
          icon={InDirectIncome}
          linkText="view details"
          bgColor="#ffbd5a"
          cardBgColor="#28c66f"
        />

        {/* <HomeCard
          cardName='Rank Income'
          cardValue={`₹${
            data?.data?.rankIncome
              ? parseFloat(data?.data?.rankIncome).toFixed(4)
              : "0"
          }`}
          icon={levelIncome}
          bgColor='#5F8D4E'
          cardBgColor='#28c66f'
        />{" "} */}
        <HomeCard
          cardName="Deposit Balance"
          cardValue={`₹${
            data?.data?.depositBalance
              ? parseFloat(data?.data?.depositBalance).toFixed(4)
              : "0"
          }`}
          icon={withdrawIncome}
          bgColor="#9ED5C5"
          cardBgColor="#fe9f43"
        />
        <HomeCard
          cardName="Winning Wallet"
          cardValue={`₹${
            data?.data?.winingWallect
              ? parseFloat(data?.data?.winingWallect).toFixed(4)
              : "0"
          }`}
          icon={InDirectIncome}
          linkText="view details"
          bgColor="#ffbd5a"
          cardBgColor="#28c66f"
        />
      </div>
    </div>
  );
};

export default Wallet;
