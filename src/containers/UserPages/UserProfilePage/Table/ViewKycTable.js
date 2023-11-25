import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  { id: "username", label: "Username", minWidth: 50 },
  { id: "submissionDate", label: "Submission Date", minWidth: 50 },
  { id: "kycMethod", label: "KYC Method", minWidth: 50 },
  { id: "cardNumber", label: "Card Number", minWidth: 50 },
  { id: "frontSide", label: "Front Side", minWidth: 50 },
  { id: "backSide", label: "Back Side", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
];

const ViewKYCTable = ({
  data,
  statusChange,
  showImageDetails,
  showPaymentMethodDetails,
}) => {
  function createData(
    sn,
    username,
    submissionDate,
    kycMethod,
    cardNumber,
    frontSide,
    backSide,
    status
  ) {
    return {
      sn,
      username,
      submissionDate,
      kycMethod,
      cardNumber,
      frontSide,
      backSide,
      status,
    };
  }

  const rows =
    data &&
    data?.map((d, i) =>
      createData(
        i + 1,
        d?.username,
        new Date(d?.submission_date).toDateString(),
        <span
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {d?.kyc_method}
        </span>,
        <p>{d?.card_number}</p>,
        <span
          onClick={() => showImageDetails({ proof: d?.front_side })}
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {d?.front_side ? (
            <img
              style={{ width: "30px", height: "30px" }}
              src={d?.front_side}
              alt=""
            ></img>
          ) : (
            "N/A"
          )}
        </span>,
        <span
          onClick={() => showImageDetails({ proof: d?.back_side })}
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {d?.back_side ? (
            <img
              style={{ width: "30px", height: "30px" }}
              src={d?.back_side}
              alt=""
            ></img>
          ) : (
            "N/A"
          )}
        </span>,
        <span
          name="status"
          style={{
            border: "none",
            outline: "none",
            padding: "5px 8px",
            borderRadius: "5px",
            textTransform: "capitalize",
            backgroundColor:
              d?.status?.toLowerCase() === "pending"
                ? "rgba(255,189,90,.2)"
                : d.status?.toLowerCase() === "success"
                ? "rgba(28,213,174,.2)"
                : "rgba(247,79,117,.2)",
            color:
              d?.status?.toLowerCase() === "pending"
                ? "#ffc107"
                : d?.status?.toLowerCase() === "success"
                ? "#38cab3"
                : "#f74f75",
          }}
        >
          {d?.status}
        </span>
      )
    );
  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        perPageShow={8}
        tableHeight={590}
        className="common_table"
      />
    </>
  );
};

export default ViewKYCTable;
