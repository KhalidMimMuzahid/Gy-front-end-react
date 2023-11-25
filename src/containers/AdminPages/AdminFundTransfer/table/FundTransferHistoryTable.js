import React from "react";
import DataTable from "../../../../components/DataTable";

const FundTransferHistoryTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sr", label: "S.N", minWidth: 20 },
    { id: "user_id", label: "User Id", minWidth: 100 },
    {
      id: "receiver_id",
      label: "Transfer To",
      minWidth: 100,
    },
    {
      id: "requested_amount",
      label: "Requested Amount",
      minWidth: 120,
    },
    {
      id: "amount_after_charge",
      label: "After Charge",
      minWidth: 120,
    },
    {
      id: "transaction_id",
      label: "Transaction Id",
      minWidth: 120,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 80,
    },
  ];

  function createData(
    sr,
    user_id,
    receiver_id,
    requested_amount,
    amount_after_charge,
    transaction_id,
    date,
    status
  ) {
    return {
      sr,
      user_id,
      receiver_id,
      requested_amount,
      amount_after_charge,
      transaction_id,
      date,
      status,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.user_id,
      d?.receiver_id,
      "₹" + parseFloat(d?.requested_amount).toFixed(4),
      "₹" + parseFloat(d?.amount_after_charge).toFixed(4),
      <span
        onClick={() => showDetails(d)}
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {d?.transaction_id}
      </span>,
      new Date(d?.time?.date).toDateString(),
      <span
        style={{
          borderRadius: "50px",
          padding: "5px 8px",
          fontSize: "13px",
          textTransform: "capitalize",
          backgroundColor:
            d?.status === "pending"
              ? "rgba(255,189,90,.2)"
              : d?.status === "success"
              ? "rgba(28,213,174,.2)"
              : "rgba(247,79,117,.2)",
          color:
            d?.status === "pending"
              ? "#ffc107"
              : d?.status === "success"
              ? "#38cab3"
              : "#f74f75",
        }}
      >
        {d.status}
      </span>
    )
  );
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={10}
      tableHeight={440}
      className='common_table'
    />
  );
};

export default FundTransferHistoryTable;
