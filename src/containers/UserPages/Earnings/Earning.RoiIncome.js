import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import Loading from "../../../components/Loading/Loading";
import RoiIncomeTable from "./Table/RoiIncomeTable";
import { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Modal from "../../../components/Modal";
import roiIncomeIcon from "../../../assets/dashboardIcon/roi.png";
import UserIncomeCard from "../../../components/UserIncomeCard/UserIncomeCard";
import { useGetAllWalletQuery } from "../../../Services/walletApi";
import { useGetRoiIncomeHistoryUserQuery } from "../../../Services/earningApi";
const RoiIncome = () => {
  const { data } = useGetAllWalletQuery();
  const { data: roiData, isLoading: isRoiLoading } =
    useGetRoiIncomeHistoryUserQuery();
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  if (isRoiLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <div className="UserEarning_dash_content card_row">
          <UserIncomeCard
            cardName=" Actinic Bonus"
            cardValue={`₹${
              data?.data?.roiIncome
                ? parseFloat(data?.data?.roiIncome).toFixed(4)
                : "0"
            }`}
            icon={roiIncomeIcon}
            bgColor="#38cab3"
            linkText="view details"
            cardBgColor="#F7941D"
          />
        </div>
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle=" Actinic Bonus"
          table={
            <RoiIncomeTable
              data={roiData?.data?.history}
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
        <div className="ss-trade_commol_modal_field">
          <div
            className="transaction_details"
            style={{ textAlign: "left", marginTop: "20px" }}
          >
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Package:</strong>
              <span>₹{roiData?.data?.currentPackage}</span>
            </p>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Amount:</strong>
              <span>₹{Number(values.commissionAmount).toFixed(4)}</span>
            </p>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Date:</strong>
              <span>{values?.incomeDate}</span>
            </p>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Time:</strong>
              <span>{values?.incomeTime}</span>
            </p>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Status:</strong>
              <span>success</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RoiIncome;
