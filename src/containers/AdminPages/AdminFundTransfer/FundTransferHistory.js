import React, { useRef, useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import Modal from "../../../components/Modal";
import { useClickOutside } from "../../../hooks/useClickOutside";

import { useFundTransferHistoryAdminQuery } from "../../../Services/fundTransferApi";
import FundTransferHistoryTable from "./table/FundTransferHistoryTable";
import Loading from "../../../components/Loading/Loading";

const FundTransferHistory = () => {
  const { data, isLoading } = useFundTransferHistoryAdminQuery();
  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="fundtransferhistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Fund Transfer History (${
          data?.fundtransfer[0]?.history.length
            ? data?.fundtransfer[0]?.history.length
            : "0"
        })`}
        table={
          <FundTransferHistoryTable
            data={data?.fundtransfer[0]?.history}
            showDetails={showDetails}
          />
        }
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
                <strong>User Id:</strong> <span>{details.user_id}</span>
              </p>
              <p>
                <strong>Transfer To:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "rgba(255,189,90,.2)",
                    color: "#ffc107",
                  }}
                >
                  <span>{details?.receiver_id}</span>
                </span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Date:</strong> <span>{details?.time?.date}</span>
              </p>
              <p>
                <strong>Time:</strong>{" "}
                <span>{details?.time?.time}&nbsp;(IST)</span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Requested Amount:</strong>{" "}
                <span>${details?.requested_amount}</span>
              </p>
              <p>
                <strong>Amount After Charged:</strong>{" "}
                <span>${details?.amount_after_charge}</span>
              </p>
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

export default FundTransferHistory;
