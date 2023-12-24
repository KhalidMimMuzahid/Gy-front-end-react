import React from "react";
import DataTable from "../../../../components/DataTable";

const LevelIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "income_from_user_id", label: "Income From User ID", minWidth: 100 },
    { id: "level", label: "Level", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
    },
    {
      id: "type",
      label: "Type",
      minWidth: 100,
    },
  ];

  function createData(sn, income_from_user_id, level, amount, date, type) {
    return { sn, income_from_user_id, level, amount, date, type };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.incomeFromUserId,
      d?.level,
      "₹" + Number(d?.winningAmount).toFixed(4),
      d?.date || "this is date",
      d?.type || "profit-share"
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

export default LevelIncomeTable;
