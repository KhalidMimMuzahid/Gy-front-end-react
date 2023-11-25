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
  // {
  //   id: "trx_amount",
  //   label: "Amount (USDT)",
  //   minWidth: 100,
  // },
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

const SuccessDepositTable = ({ data, showDetails }) => {
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
      new Date(d?.date).toDateString(),
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
          backgroundColor: "rgba(28,213,174,.2)",
          color: "#38cab3",
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

export default SuccessDepositTable;
