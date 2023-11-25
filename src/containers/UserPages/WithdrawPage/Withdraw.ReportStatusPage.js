import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import WithdrawHistoryTable from "./table/withdrawHistoryTable";
import { useGetWithdrawHistoryQuery } from "../../../Services/walletApi";
import { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Modal from "../../../components/Modal";

const WithdrawHistoryPage = () => {
  const { data } = useGetWithdrawHistoryQuery();
  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));

  return (
    <>
      <SectionCommonTable
        wrapperClassName="withdrawrhistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Withdraw History"
        table={<WithdrawHistoryTable data={data?.data} showDetails={showDetails} />}
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Transaction Details"
        modalRef={modalRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details">
            <div className="group">
              <p>
                <strong>Name:</strong> <span>{details.fullName}</span>
              </p>
              <p>
                <strong>User Id:</strong> <span>{details.userId}</span>
              </p>
              <p>
                <strong>Sponsor Id:</strong> <span>{details.sponsorId}</span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Date:</strong>{" "}
                <span>{details?.date}</span>
              </p>
              <p>
                <strong>Time:</strong> <span>{details?.time}&nbsp;(IST)</span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Request Amount:</strong>{" "}
                <span>${details?.requestAmount}</span>
              </p>
              <p>
                <strong>Withdraw Type:</strong>{" "}
                <span>{details?.withdrawType?.toUpperCase()}</span>
              </p>
              <p>
                <strong>Current Balance:</strong>{" "}
                <span>${details?.currentAmount}</span>
              </p>
              <p>
                <strong>Wallet (USDT):</strong>{" "}
                <span>
                  {details.trxAddress}
                </span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    backgroundColor:
                      details.status === "pending"
                        ? "rgba(255,189,90,.2)"
                        : details.status === "success"
                        ? "rgba(28,213,174,.2)"
                        : "rgba(247,79,117,.2)",
                    color:
                      details.status === "pending"
                        ? "#ffc107"
                        : details.status === "success"
                        ? "#38cab3"
                        : "#f74f75",
                  }}
                >
                  {details.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WithdrawHistoryPage;
