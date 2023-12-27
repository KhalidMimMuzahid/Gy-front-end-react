import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 50 },
  {
    id: "date",
    label: "Date",
    minWidth: window.innerWidth > 476 ? 120 : 60,
  },
  {
    id: "request_amount",
    label: "Request Amount",
    minWidth: window.innerWidth > 476 ? 80 : 40,
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
    id: "withdraw_type",
    label: "Withdraw Type",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "current_balance",
    label: "Current Balance",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "transaction_id",
    label: "Transaction ID",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  // {
  //   id: "transaction_hash",
  //   label: "Transaction Hash",
  //   minWidth: 110,
  // },
  {
    id: "action",
    label: "Action",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
];

const AllWithdrawTable = ({ data, showDetails, statusChange }) => {
  function createData(
    sr,
    userId,
    date,
    request_amount,
    after_charge,
    withdrawCharge,
    withdraw_type,
    current_balance,
    transaction_id,
   
    action
  ) {
    return {
      sr,
      userId,
      date,
      request_amount,
      after_charge,
      withdrawCharge,
      withdraw_type,
      current_balance,
      transaction_id,
      // transaction_hash,
      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      new Date(d?.date).toDateString(),
      "₹" + parseFloat(d?.requestAmount)?.toFixed(4),
      "₹" + parseFloat(d?.amountAfterCharge)?.toFixed(4),
      d?.withdrawCharge + "%",
      d?.withdrawType?.toUpperCase(),
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
      // d?.transactionHash ? (
      //   <a
      //     href={`https://bscscan.com/tx/${d?.transaction_hash}`}
      //     target='_blank'
      //     rel='noreferrer'
      //     style={{
      //       userSelect: "none",
      //       cursor: "pointer",
      //       textDecoration: "underline",
      //       color: `var(--text-p-color)`,
      //     }}
      //   >
      //     {d?.hash?.slice(0, 5) + "..." + d?.hash?.slice(d?.hash?.length - 5)}
      //   </a>
      // ) : (
      //   "N/A"
      // ),
      <span>
        <select
          name='status'
          style={{
            border: "none",
            outline: "none",
            padding: "5px 8px",
            borderRadius: "5px",
            textTransform: "capitalize",
            backgroundColor:
              d?.status === "pending"
                ? "rgba(255,189,90,.2)"
                : d.status === "success"
                ? "rgba(28,213,174,.2)"
                : "rgba(247,79,117,.2)",
            color:
              d?.status === "pending"
                ? "#ffc107"
                : d.status === "success"
                ? "#38cab3"
                : "#f74f75",
          }}
          value={d?.status}
          onChange={(e) =>
            statusChange(e.target.value, d?.transactionId, d?.userId)
          }
        >
          <option value='pending'>pending</option>
          <option value='success'>success</option>
          <option value='reject'>reject</option>
        </select>
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

export default AllWithdrawTable;
