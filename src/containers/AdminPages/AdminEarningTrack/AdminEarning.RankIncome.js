import React, { useState, useEffect } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllRankIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import RankIncomeTable from "./Table/RankIncomeTable";
import Modal from "../../../components/Modal";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Loading from "../../../components/Loading/Loading";
const RankIncome = () => {
  const { data, isLoading } = useGetAllRankIncomeHistoryAdminQuery();
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };

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
    const amountArr = arr?.filter((d) => d?.rewardAmount);
    const sum = amountArr?.reduce(
      (accumulator, currentValue) => accumulator + currentValue?.rewardAmount,
      initialValue
    );
    setTotalAmount(sum?.toFixed(2));
  }, [filterData, data?.data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle={`Rank Income (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={data?.data}
          setFilterData={setFilterData}
          setDate={setDate}
          countContainer={totalAmount}
          setMonthWiseFilterData={setMonthWiseFilterData}
          monthWiseFilterData={monthWiseFilterData}
          table={
            <RankIncomeTable
              data={filterData?.length ? filterData : data?.data}
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
            <table>
              <tr>
                <th>User Id</th>
                <th>Package</th>
              </tr>
              {values?.incomeFrom?.map((d, i) => (
                <tr key={i + 11}>
                  <td>{d?.userId}</td>
                  <td>${d?.amount}</td>
                </tr>
              ))}
            </table>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Amount:</strong>
              <span>${values?.amount}</span>
            </p>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Date:</strong>
              <span>{values?.date}</span>
            </p>
            <p className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>Time:</strong>
              <span>{values?.time}</span>
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

export default RankIncome;
