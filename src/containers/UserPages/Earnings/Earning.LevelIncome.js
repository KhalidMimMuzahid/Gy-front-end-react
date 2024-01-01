import React, { useRef, useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";
import roiIncomeIcon from "../../../assets/dashboardIcon/roi.png";
import { useGetAllLevelIncomeHistoryUserQuery } from "../../../Services/earningApi";
import LevelIncomeTable from "./Table/LevelIncomeTable";
import Loading from "../../../components/Loading/Loading";
import { useClickOutside } from "../../../hooks/useClickOutside";
import TransactionModal from "../../../components/Modal/TransactionModal";
const LevelIncome = () => {
  const { data: levelIncome, isLoading: isLoadingDirectIncome } =
    useGetAllLevelIncomeHistoryUserQuery();

  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  const modalData = {
    fullName: values?.fullName,
    userId: values?.userId,
    amount: "₹" + Number(values?.amount).toFixed(4),
    package: "₹" + values?.levelUserPackageInfo?.amount,
    date: values?.date,
    time: values?.time,
    status: "success",
  };

  if (isLoadingDirectIncome) {
    return <Loading />;
  }
  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <div className='UserEarning_dash_content card_row'>
          <UserIncomeCard
            cardName='Level ROI'
            cardValue={`₹${
              levelIncome?.data?.levelROI.toFixed(4)
              || 0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
          <UserIncomeCard
            cardName='Winning From Level'
            cardValue={`₹${
              levelIncome?.data?.winingFromLevel.toFixed(4) || 0
            }`}
            icon={roiIncomeIcon}
            bgColor='#0087F6'
            linkText='view details'
            cardBgColor='#F7941D'
          />
        </div>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle='Levels'
          table={
            <LevelIncomeTable
              data={levelIncome.data}
              showDetails={showDetails}
            />
          }
        />
      </div>
      <TransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalRef={modalRef}
        modalTitle='Details'
        objValue={modalData}
      />
    </>
  );
};

export default LevelIncome;
