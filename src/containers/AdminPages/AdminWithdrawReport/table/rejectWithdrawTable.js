import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  {
    id: "userId",
    label: "User ID",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "date",
    label: "Date",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "request_amount",
    label: "Request Amount",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "after_charge",
    label: "After Charge",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "withdrawCharge",
    label: "Withdraw Charge",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "current_balance",
    label: "Current Balance",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "transaction_id",
    label: "Transaction ID",
    minWidth: window.innerWidth > 476 ? 100 : 60,
  },
  {
    id: "status",
    label: "Status",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
];

const RejectWithdrawTable = ({ data, showDetails }) => {
  function createData(
    sr,
    userId,
    date,
    request_amount,
    after_charge,
    withdrawCharge,
    current_balance,
    transaction_id,
    status
  ) {
    return {
      sr,
      userId,
      date,
      request_amount,
      after_charge,
      withdrawCharge,
      current_balance,
      transaction_id,
      status,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.date,
      "₹" + parseFloat(d?.requestAmount)?.toFixed(4),
      "₹" + parseFloat(d?.amountAfterCharge)?.toFixed(4),
      d?.withdrawCharge + "%",
      "₹" + parseFloat(d?.currentAmount)?.toFixed(4),
      <span
        onClick={() => showDetails(d)}
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {d?.transactionId}
      </span>,
      <span
        style={{
          border: "none",
          outline: "none",
          padding: "5px 8px",
          borderRadius: "5px",
          textTransform: "capitalize",
          backgroundColor: "rgba(247,79,117,.2)",
          color: "#f74f75",
        }}
      >
        {d?.status}
      </span>
    )
  );
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={6}
      tableHeight={440}
      className="common_table"
    />
  );
};

export default RejectWithdrawTable;
