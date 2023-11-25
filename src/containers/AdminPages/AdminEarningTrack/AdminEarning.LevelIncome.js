import React, { useState, useEffect } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllDirLevIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import LevelIncomeTable from "./Table/LevelIncomeTable";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import TransactionModal from "../../../components/Modal/TransactionModal";
import Loading from "../../../components/Loading/Loading";

const LevelIncome = () => {
  const { data, isLoading } = useGetAllDirLevIncomeHistoryAdminQuery();
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
    userid: values?.userId,
    amount: "₹" + Number(values?.amount).toFixed(4),
    SelfPackage: "₹" + values?.selfPackageInfo?.amount,
    LevelUserId: values?.incomeFrom,
    LevelPackage: "₹" + values?.levelUserPackageInfo?.amount,
    date: values?.date,
    time: values?.time,
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
          sectionTableTitle={`Profit Share (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={filterData?.length > 0 ? filterData : data?.data}
          setFilterData={setFilterData}
          table={
            <LevelIncomeTable
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

export default LevelIncome;
