import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoPoolIncomeTable = ({ data }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "user_id", label: "User ID", minWidth: 100 },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "level",
      label: "Level",
      minWidth: 80,
    },
    {
      id: "transaction_id",
      label: "Transaction ID",
      minWidth: 100,
    },
  ];

  function createData(sn, user_id, date, amount, level, transaction_id) {
    return { sn, user_id, date, amount, level, transaction_id };
  }

  const rows = data?.level_income?.map((d, i) =>
    createData(
      i + 1,
      d.user_id,
      new Date(d.date).toDateString(),
      "₹" + parseFloat(d?.amount).toFixed(4),
      d.level,
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

export default AutoPoolIncomeTable;
