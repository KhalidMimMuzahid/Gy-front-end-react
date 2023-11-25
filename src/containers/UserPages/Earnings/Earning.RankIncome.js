import React, { useState, useRef } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";
import roiIncomeIcon from "../../../assets/dashboardIcon/roi.png";
import { useGetUserRankIncomeQuery } from "../../../Services/earningApi";
import Loading from "../../../components/Loading/Loading";
import RankIncomeTable from "./Table/RankIncomeTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Modal from "../../../components/Modal";
const RankIncome = () => {
  const { data: rankIncome, isLoading: isLoadingDirectIncome } =
    useGetUserRankIncomeQuery();
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };

  if (isLoadingDirectIncome) {
    return <Loading />;
  }
  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <div className='UserEarning_dash_content card_row'>
          <UserIncomeCard
            cardName='Rank Income'
            cardValue={`₹${
              rankIncome?.data?.totalLevelIncome
                ? parseFloat(rankIncome?.data?.totalLevelIncome).toFixed(4)
                : "0"
            }`}
            icon={roiIncomeIcon}
            bgColor='#38cab3'
            linkText='view details'
            cardBgColor='#00d0e7'
          />
        </div>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle='Rank Income'
          table={
            <RankIncomeTable
              data={rankIncome?.data}
              setValues={setValues}
              showDetails={showDetails}
            />
          }
        />
      </div>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Details"}
        modalRef={modalRef}
      >
        <div className='ss-trade_commol_modal_field'>
          <div
            className='transaction_details'
            style={{ textAlign: "left", marginTop: "20px" }}
          >
            <p className='trans__row'>
              <strong style={{ textTransform: "capitalize" }}>Amount:</strong>
              <span>${values?.rewardAmount}</span>
            </p>
            <p className='trans__row'>
              <strong style={{ textTransform: "capitalize" }}>Date:</strong>
              <span>{values?.date}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RankIncome;
