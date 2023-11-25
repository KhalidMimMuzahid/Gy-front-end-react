import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoTradeIncomeHistoryTable = ({ data }) => {
  /* data fetch by RTK */
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userId", label: "User ID", minWidth: 100 },
    {
      id: "full_name",
      label: "Full Name",
      minWidth: 80,
    },
    {
      id: "packages",
      label: "package",
      minWidth: 120,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 100,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
    },
  ];

  function createData(sn, userId, full_name, packages, amount, date) {
    return { sn, userId, full_name, packages, amount, date };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      `₹${d?.packages} ${d?.privilege ? "-" + d?.privilege : " "}`,
      "₹" + d?.totalCommissionAmount,
      d?.incomeDate
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

export default AutoTradeIncomeHistoryTable;
