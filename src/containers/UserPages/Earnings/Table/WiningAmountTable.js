import React from "react";
import DataTable from "../../../../components/DataTable";

const WinningAmountTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "userId",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "periodId",
      label: "Period ID",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: window.innerWidth > 476 ? 120 : 40,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 120 : 50,
    },
  ];

  function createData(sn, userId, periodId, amount, date) {
    return { sn, userId, periodId, amount, date };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.periodId,
      "₹" + Number(d?.commissionAmount).toFixed(4),
      d?.incomeDate
    )
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={10}
      tableHeight={600}
      className="common_table"
    />
  );
};

export default WinningAmountTable;
