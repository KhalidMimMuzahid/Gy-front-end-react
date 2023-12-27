import React from "react";
import DataTable from "../../../../components/DataTable";

const WithdrawHistoryTable = ({ data, showDetails }) => {
  const columns = [
    { id: "id", label: "Sr.", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "request_amount",
      label: "Request Amount",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "withdraw_charge",
      label: "Withdraw Charge",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "receive_amount",
      label: "Receive Amount",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "main_amount",
      label: "Current Balance",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "withdrawType",
      label: "Withdraw Type",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "transaction_id",
      label: "Transaction ID",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    // {
    //   id: "hash",
    //   label: "Hash",
    //   minWidth: 100,
    // },
    {
      id: "status",
      label: "Status",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
  ];

  function createData(
    id,
    user_id,
    date,
    request_amount,
    withdraw_charge,
    receive_amount,
    main_amount,
    withdrawType,
    transaction_id,
    // hash,
    status
  ) {
    return {
      id,
      user_id,
      date,
      request_amount,
      withdraw_charge,
      receive_amount,
      main_amount,
      withdrawType,
      transaction_id,
      // hash,
      status,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.date,
      "₹" + parseFloat(d?.requestAmount).toFixed(4),
      d?.withdrawCharge + "%",
      "₹" + parseFloat(d?.amountAfterCharge).toFixed(4),
      "₹" + d?.currentAmount,
      d?.withdrawType?.toUpperCase(),
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
      // d?.hash ? d?.hash : "N/A",
      <span
        style={{
          borderRadius: "50px",
          padding: "5px 8px",
          fontSize: "13px",
          textTransform: "capitalize",
          backgroundColor:
            d.status === "pending"
              ? "rgba(255,189,90,.2)"
              : d.status === "success"
              ? "rgba(28,213,174,.2)"
              : "rgba(247,79,117,.2)",
          color:
            d.status === "pending"
              ? "#ffc107"
              : d.status === "success"
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
      perPageShow={6}
      tableHeight={440}
      className='common_table'
    />
  );
};

export default WithdrawHistoryTable;
