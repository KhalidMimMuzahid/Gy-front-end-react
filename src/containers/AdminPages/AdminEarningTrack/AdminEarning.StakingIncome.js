import React, { useState, useEffect } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllStakingIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import StakingIncomeTable from "./Table/StakingIncomeTable";
import TransactionModal from "../../../components/Modal/TransactionModal";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Loading from "../../../components/Loading/Loading";
const StakingIncome = () => {
  const { data, isLoading } = useGetAllStakingIncomeHistoryAdminQuery();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  const modalData = {
    userid: values?.userId,
    fullName: values?.fullName,
    package: values?.package,
    percentage: values?.commissionPercentagePerDay + "%",
    amount: "₹" + Number(values?.commissionAmount).toFixed(4),
    totalAmount: "₹" + Number(values?.totalCommissionAmount).toFixed(4),
    date: values?.incomeDate,
    time: values?.incomeTime,
    status: "success",
  };

  const [filterData, setFilterData] = useState([]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle={` Actinic Bonus (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={filterData?.length > 0 ? filterData : data?.data}
          setFilterData={setFilterData}
          table={
            <StakingIncomeTable
              data={filterData?.length > 0 ? filterData : data?.data}
              showDetails={showDetails}
            />
          }
        />
      </div>
      <TransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalRef={modalRef}
        modalTitle="Details"
        objValue={modalData}
      />
    </>
  );
};

export default StakingIncome;
