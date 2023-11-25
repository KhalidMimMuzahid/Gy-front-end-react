import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { Notification } from "../../../components/ToastNotification";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  useAllWithdrawHistoryQuery,
  useEditWithdrawStatusMutation,
} from "../../../Services/withdrawApi";
import AllWithdrawTable from "./table/allWithdrawTable";

const AllWithdraw = () => {
  const { data, isLoadingAllWithdrawHistory } = useAllWithdrawHistoryQuery();

  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  // get all deposit history
  // status change
  const [statusWithdraw, { data: statusData, error: statusError }] =
    useEditWithdrawStatusMutation();

  useEffect(() => {
    if (statusData?.message) {
      Notification(statusData?.message, "success");
    } else {
      Notification(statusError?.data?.message, "error");
    }
  }, [statusError, statusData]);

  const statusChange = async (status, id, userId) => {
    const statusChanges = {
      transaction_id: id,
      status: status,
      userId: userId,
    };
    await statusWithdraw(statusChanges);
  };

  // wallet address copy
  const [text, setText] = useState({
    address: details.wallet_address,
  });
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text.address);
    Notification("Wallet address copied", "success");
  };
  useEffect(() => {
    setText({
      address: details.wallet_address,
    });
  }, [details.wallet_address]);
  const [filterData, setFilterData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");
  const [monthWiseFilterData, setMonthWiseFilterData] = useState({});
  useEffect(() => {
    if (monthWiseFilterData?.year && monthWiseFilterData?.month) {
      const filtRes = data?.data?.filter((d, i) =>
        d?.date?.includes(monthWiseFilterData?.year)
      );
      const res = filtRes?.filter((d) =>
        d?.date?.includes(monthWiseFilterData?.month)
      );
      setFilterData(res);
    }
  }, [monthWiseFilterData?.year, monthWiseFilterData?.month]);
  useEffect(() => {
    const filterDate = new Date(date).toDateString();
    const filterResult = data?.data?.filter((d) => d?.date == filterDate);
    setFilterData(filterResult);
  }, [date]);

  useEffect(() => {
    const initialValue = 0;
    const arr = filterData?.length > 0 ? filterData : data?.data;
    const sum = arr?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.requestAmount,
      initialValue
    );
    setTotalAmount(sum);
  }, [filterData, data?.data]);

  if (isLoadingAllWithdrawHistory) {
    return <Loading />;
  }

  return (
    <>
      <SectionCommonTable
        wrapperClassName="allwithdraw_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Withdraw History (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={data?.data}
        setFilterData={setFilterData}
        countContainer={totalAmount}
        setDate={setDate}
        date={date}
        // sendAll={sendAllHandler}
        // adminBalance={adminBalance}
        setMonthWiseFilterData={setMonthWiseFilterData}
        monthWiseFilterData={monthWiseFilterData}
        table={
          <AllWithdrawTable
            data={filterData?.length > 0 ? filterData : data?.data}
            showDetails={showDetails}
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
                <strong>Request Amount:</strong>{" "}
                <span>${Number(details?.requestAmount).toFixed(4)}</span>
              </p>
              <p>
                <strong>After Charge:</strong>{" "}
                <span>${Number(details?.afterCharge).toFixed(4)}</span>
              </p>
              <p>
                <strong>Withdraw Charge:</strong>{" "}
                <span>${details?.withdrawCharge}</span>
              </p>
              <p>
                <strong>Current Balance:</strong>{" "}
                <span>${Number(details?.currentAmount).toFixed(4)}</span>
              </p>
              <p>
                <strong>Wallet (USDT):</strong>{" "}
                <span onClick={copyToClipboard} title="Copy to clipboard">
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

export default AllWithdraw;
