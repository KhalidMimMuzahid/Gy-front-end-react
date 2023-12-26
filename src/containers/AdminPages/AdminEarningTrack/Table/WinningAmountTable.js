import React from "react";
import DataTable from "../../../../components/DataTable";

const WinningAmountTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "user_id",
      label: "User Id",
      minWidth: 120,
    },
    {
      id: "periodId",
      label: "Period ID",
      minWidth: 120,
    },
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
  ];

  function createData(sn, user_id, periodId, amount, date) {
    return { sn, user_id, periodId, amount, date };
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
      perPageShow={6}
      tableHeight={440}
      className="common_table"
    />
  );
};

export default WinningAmountTable;
