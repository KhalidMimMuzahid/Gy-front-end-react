import React from "react";
import DataTable from "../../../../components/DataTable";

const RoyaltyIncomeHistoryTable = ({ data, showMessage }) => {
  const columns = [
    { id: "sr", label: "S.N", minWidth: 20 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
    },
    {
      id: "remark",
      label: "Remark",
      minWidth: 100,
    },
    {
      id: "receiver_id",
      label: "Transfer To",
      minWidth: 100,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
    },
  ];

  function createData(sr, amount, remark, receiver_id, date) {
    return {
      sr,
      amount,
      remark,
      receiver_id,
      date,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      "₹" + d.amount,
      "Royalty Bonus",
      // <span
      //   style={{
      //     cursor: "pointer",
      //     textDecoration: "underline",
      //   }}
      //   onClick={() => showMessage(d)}
      // >
      //   {d?.remark?.length > 40
      //     ? d?.remark?.slice(0, 40 - 1) + "..."
      //     : d?.remark}
      // </span>,
      d?.member_id,
      d?.date
      // new Date(d.createdAt).toDateString(),
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

export default RoyaltyIncomeHistoryTable;
