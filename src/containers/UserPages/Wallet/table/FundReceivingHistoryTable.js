import React from "react";
import DataTable from "../../../../components/DataTable";

const FundReceivingHistoryTable = ({ data }) => {
  const columns = [
    { id: "index", label: "Sr.", minWidth: 20 },
    { id: "user_id", label: "User ID", minWidth: 100 },
    { id: "user_name", label: "Name", minWidth: 100 },
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
  ];

  function createData(index, user_id, user_name, amount, date, transaction_id) {
    return {
      index,
      user_id,
      user_name,
      amount,
      date,
      transaction_id,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d.user_id,
      d.name,
      "₹" + d.amount_after_charge,
      new Date(d.date).toDateString(),
      d.transaction_id
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

export default FundReceivingHistoryTable;
