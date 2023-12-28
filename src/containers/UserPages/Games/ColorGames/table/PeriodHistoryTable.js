import React from "react";
import DataTable from "../../../../../components/DataTable";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  {
    id: "userId",
    label: "User ID",
    minWidth: 30,
  },
  {
    id: "winningAmount",
    label: "Amount",
    minWidth:  30,
  },
];

const PeriodHistoryTable = ({ data }) => {
  function createData(sn, userId, winningAmount) {
    return {
      sn,
      userId,
      winningAmount,
    };
  }
console.log("my table Data",data)
  const rows = data?.map((d, index) =>
    createData(index + 1, d?.userId, d?.winningAmount ? d?.winningAmount : 0)
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

export default PeriodHistoryTable;
