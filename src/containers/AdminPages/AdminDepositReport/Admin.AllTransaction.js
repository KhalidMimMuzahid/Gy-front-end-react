import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { Notification } from "../../../components/ToastNotification";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  useAllDepositeHistoryQuery,
  useEditDepositStatusMutation,
} from "../../../Services/depositeApi";
import AllDepositTable from "./table/allDepositTable";

const AllTransaction = () => {
  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  // get all deposit history
  const { data, isLoadingAllDepositHistory } = useAllDepositeHistoryQuery();
  // status change
  const [statusDepo, { data: statusData, error: statusError }] =
    useEditDepositStatusMutation();
  useEffect(() => {
    if (statusData?.message) {
      Notification(statusData?.message, "success");
    } else {
      Notification(statusError?.data?.message, "error");
    }
  }, [statusError, statusData]);
  const statusChange = async (status, id) => {
    const statusChanges = {
      transaction_id: id,
      status: status,
    };
    await statusDepo(statusChanges);
  };
  const [filterData, setFilterData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const initialValue = 0;
    const arr = filterData?.length > 0 ? filterData : data?.data;
    const amountArr = arr?.filter((d) => d?.amount);
    const sum = amountArr?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.amount,
      initialValue
    );
    setTotalAmount(sum);
  }, [filterData, data?.data]);

  if (isLoadingAllDepositHistory) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Deposit History (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={filterData?.length > 0 ? filterData : data?.data}
        setFilterData={setFilterData}
        countContainer={totalAmount}
        table={
          <AllDepositTable
            data={filterData?.length > 0 ? filterData : data?.data}
            showDetails={showDetails}
            showImageDetails={showImageDetails}
            statusChange={statusChange}
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
            <p>
              <strong>Payment Method: </strong>
              <span> {details?.payment_method}</span>
            </p>
            {details?.payment_method === "Paytm" && (
              <p>
                <strong>Paytm account No:</strong>{" "}
                <span>{details?.receiving_wallet?.account_no}</span>
              </p>
            )}
            {details?.payment_method === "TRX" && (
              <p>
                <strong>Trx account No:</strong>
                <span>{details?.receiving_wallet?.trx}</span>
              </p>
            )}
            {details?.payment_method === "UPI" && (
              <>
                <p>
                  <strong>UPI account No:</strong>{" "}
                  <span>{details?.receiving_wallet?.account_no}</span>
                </p>
              </>
            )}
            {details?.payment_method === "Bank" && (
              <>
                <p>
                  <strong>Bank Name:</strong>{" "}
                  <span>{details?.receiving_wallet?.bank_name}</span>
                </p>
                <p>
                  <strong>Bank account Number:</strong>{" "}
                  <span>{details?.receiving_wallet?.account}</span>
                </p>
                <p>
                  <strong>IFSC Code:</strong>{" "}
                  <span>{details?.receiving_wallet?.ifsc_code}</span>
                </p>
                <p>
                  <strong>Bank account Holder Name:</strong>{" "}
                  <span>{details?.receiving_wallet?.account_name}</span>
                </p>
              </>
            )}
            <hr
              style={{
                backgroundColor: "#7013ad",
                margin: "8px 0px",
                height: "2px",
              }}
            />
            <p>
              <strong>Deposit Amount: </strong>
              <span>₹{details?.amount?.toFixed(4)}</span>
            </p>
            <p>
              <strong>Date: </strong>
              <span>{details?.time?.date || details?.date}</span>
            </p>
            <p>
              <strong>Time: </strong>
              <span>{details?.time?.time || details?.time}</span>
            </p>
            <p>
              <strong>Status: </strong>{" "}
              <span
                style={{
                  textTransform: "capitalize",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  backgroundColor:
                    details?.status === "pending"
                      ? "rgba(255,189,90,.2)"
                      : details?.status === "success"
                      ? "rgba(28,213,174,.2)"
                      : "rgba(247,79,117,.2)",
                  color:
                    details?.status === "pending"
                      ? "#ffc107"
                      : details?.status === "success"
                      ? "#38cab3"
                      : "#f74f75",
                }}
              >
                {details?.status}
              </span>
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        openModal={openModalForImage}
        setOpenModal={setOpenModalForImage}
        modalTitle="Transaction Proof Image"
        modalRef={modalImageRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details" style={{ textAlign: "center" }}>
            <img
              style={{ width: "70%", margin: "20px auto" }}
              src={details?.proofPic?.avatar}
              alt=""
            ></img>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllTransaction;
