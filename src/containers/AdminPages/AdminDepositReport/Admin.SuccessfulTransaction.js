import React, { useRef, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useCompletedDepositeHistoryQuery } from "../../../Services/depositeApi";
import SuccessDepositTable from "./table/successDepositTable";

const SuccessfulTransaction = () => {
  const { data, isLoadingCompleteDepositHistory } =
    useCompletedDepositeHistoryQuery();

  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));

  const [filterData, setFilterData] = useState([]);

  if (isLoadingCompleteDepositHistory) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Success Deposit History (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={filterData?.length > 0 ? filterData : data?.data}
        setFilterData={setFilterData}
        table={
          <SuccessDepositTable
            data={filterData?.length > 0 ? filterData : data?.data}
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
                <strong>User Id:</strong> <span>{details.userId}</span>
              </p>
              <p>
                <strong>Transfer Via:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "rgba(255,189,90,.2)",
                    color: "#ffc107",
                  }}
                >
                  Admin
                </span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Date:</strong> <span>{details?.date}</span>
              </p>
              <p>
                <strong>Time:</strong> <span>{details?.time}&nbsp;(IST)</span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Amount:</strong> <span>${details.amount}</span>
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

export default SuccessfulTransaction;
