import React, { useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetGameWalletIncomeByAdminQuery } from "../../../Services/earningApi";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import TransactionModal from "../../../components/Modal/TransactionModal";
import Loading from "../../../components/Loading/Loading";
import GameWalletTable from "./Table/GameWalletTable";

const GameWallet = () => {
  const { data, isLoading } = useGetGameWalletIncomeByAdminQuery();
  // console.log("..................................", data);
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
    userid: values?.userId,
    amount: "₹" + Number(values?.amount).toFixed(4),
    LevelUserId: values?.incomeFrom,
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
      <div className='UserEarning_wallet_page_wrapper'>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle={`Game Wallet History (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={filterData?.length > 0 ? filterData : data?.data}
          setFilterData={setFilterData}
          table={
            <GameWalletTable
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
        modalTitle='Details'
        objValue={modalData}
      />
    </>
  );
};

export default GameWallet;
