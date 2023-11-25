import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 100 },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
  {
    id: "transaction_id",
    label: "Transaction ID",
    minWidth: 100,
  },
  {
    id: "tid",
    label: "TID",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
  },
];

const RejectDepositTable = ({ data, showDetails }) => {
  function createData(
    sr,
    userId,
    name,
    amount,
    date,
    transaction_id,
    tid,
    status
  ) {
    return {
      sr,
      userId,
      name,
      amount,
      date,
      transaction_id,
      tid,
      status,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.name,
      "₹" + parseInt(d?.amount)?.toFixed(4),
      d?.date,
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
      d?.hash,
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
      perPageShow={8}
      tableHeight={610}
      className="common_table"
    />
  );
};

export default RejectDepositTable;
