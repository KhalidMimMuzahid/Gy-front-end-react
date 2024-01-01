import React, { useRef, useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";
import roiIncomeIcon from "../../../assets/dashboardIcon/roi.png";
import { useGetAllLevelIncomeHistoryUserQuery } from "../../../Services/earningApi";
import LevelIncomeTable from "./Table/LevelIncomeTable";
import Loading from "../../../components/Loading/Loading";
import { useClickOutside } from "../../../hooks/useClickOutside";
import TransactionModal from "../../../components/Modal/TransactionModal";
import { useGetAllWalletQuery } from "../../../Services/walletApi";
const Earning = () => {
  const { data, isLoading } = useGetAllWalletQuery();
  if (isLoading) {
    return <Loading />;
  }
  const totalBalance = data?.data?.investmentAmount + data?.data?.activeIncome;
  console.log({ totalBalance });
  console.log({ data });

  // modal toggle
  // const [openModal, setOpenModal] = useState(false);
  // const modalRef = useRef(null);
  // useClickOutside(modalRef, () => setOpenModal(false));
  // const [values, setValues] = useState({});
  // const showDetails = (body) => {
  //   setValues(body);
  //   setOpenModal(true);
  // };
  // const modalData = {
  //   fullName: values?.fullName,
  //   userId: values?.userId,
  //   amount: "₹" + Number(values?.amount).toFixed(4),
  //   package: "₹" + values?.levelUserPackageInfo?.amount,
  //   date: values?.date,
  //   time: values?.time,
  //   status: "success",
  // };

  // if (isLoadingDirectIncome) {
  //   return <Loading />;
  // }
  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <div className='UserEarning_dash_content card_row'>
          <UserIncomeCard
            cardName='ROI Income'
            cardValue={`₹${
              // levelIncome?.data?.totalLevelIncome
              //   ? parseFloat(levelIncome?.data?.totalLevelIncome).toFixed(4)
            //   : "0" 
              0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Level ROI'
            cardValue={`₹${
              // levelIncome?.data?.totalLevelIncome
              //   ? parseFloat(levelIncome?.data?.totalLevelIncome).toFixed(4)
            //   : "0"
              0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Winning Amount'
            cardValue={`₹${
              0
              
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Winning From Level'
            cardValue={`₹${
              0
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
