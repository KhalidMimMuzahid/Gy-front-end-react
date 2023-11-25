import React, { useRef, useState } from "react";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFundTransferHistoryQuery } from "../../../Services/fundTransferApi";
import FundTransferTable from "./table/FundTransferTable";

const AllReport = () => {
  // get all fund transfer
  const { data } = useFundTransferHistoryQuery();
  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [filterData, setFilterData] = useState([]);
  return (
    <>
      <SectionCommonTable
        wrapperClassName="fundtransfer_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Fund Transfer Report (${data?.length})`}
        data={data}
        setFilterData={setFilterData}
        table={
          <FundTransferTable
            showDetails={showDetails}
            data={filterData.length > 0 ? filterData : data}
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
                <strong>Sender User Id:</strong> <span>{details.user_id}</span>
              </p>
              <p>
                <strong>Receiver User Id:</strong>{" "}
                <span>{details.receiver_id}</span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Date:</strong>{" "}
                <span>{new Date(details?.date).toDateString()}</span>
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
                    backgroundColor: "rgba(28,213,174,.2)",
                    color: "#38cab3",
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

export default AllReport;
