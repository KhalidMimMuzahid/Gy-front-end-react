import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllStakingLevelIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import TransactionModal from "../../../components/Modal/TransactionModal";
import { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import StakingLevelIncomeTable from "./Table/StakingLevelIncomeTable";
const StakingLevelIncome = () => {
  const { data: StakingIncome } =
    useGetAllStakingLevelIncomeHistoryAdminQuery();
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  const stakModalData = {
    userId: values?.userId,
    fullName: values?.fullName,
    package: "₹" + values?.packages,
    amount: "₹" + values?.amount,
    date: values?.incomeDate,
    time: values?.incomeTime,
    status: "Success",
  };
  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle='Staking Level ROI'
          table={
            <StakingLevelIncomeTable
              data={StakingIncome?.data}
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
        objValue={stakModalData}
      />
    </>
  );
};

export default StakingLevelIncome;
