import React from "react";
import DataTable from "../../../../../components/DataTable";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 50 },
  {
    id: "color",
    label: "Color",
    minWidth: 20,
  },
  {
    id: "number",
    label: "Number",
    minWidth: 20,
  },
  {
    id: "bettingAmount",
    label: "Betting Amount",
    minWidth: 100,
  },
  {
    id: "winningAmount",
    label: "Winning Amount",
    minWidth: 100,
  },
  {
    id: "lostAmount",
    label: "Lost Amount",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 20,
  },
];

const GameHistoryTable = ({ data }) => {
  function createData(
    sn,
    userId,
    name,
    color,
    number,
    bettingAmount,
    winningAmount,
    lostAmount,
    status
  ) {
    return {
      sn,
      userId,
      name,
      color,
      number,
      bettingAmount,
      winningAmount,
      lostAmount,
      status,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.name,
      d?.color ? d?.color : "--",
      d?.number ? d?.number : "--",
      d?.bettingAmount ? d?.bettingAmount : "--",
      d?.winningAmount ? d?.winningAmount : "--",
      d?.lostAmount ? d?.lostAmount : "--",
      d?.status ? d?.status : "--"
    )
  );
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={10}
      tableHeight={640}
      className="common_table"
    />
  );
};

export default GameHistoryTable;
