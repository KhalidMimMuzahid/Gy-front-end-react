import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllBonusRewardIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import BonusRewardIncomeTable from "./Table/BonusRewardIncomeTable";
import TransactionModal from "../../../components/Modal/TransactionModal";
import { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
const BonusRewardIncome = () => {
  const { data: bonusData } = useGetAllBonusRewardIncomeHistoryAdminQuery();
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
    userId: values?.user_id,
    fullName: values?.full_name,
    package: "₹" + values?.packageInfo?.amount,
    amount: "₹" + values?.amount,
    date: values?.date,
    time: values?.time,
    status: "success",
  };
  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle='Bonus Reward Income'
          table={
            <BonusRewardIncomeTable
              data={bonusData?.data}
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

export default BonusRewardIncome;
