import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoTradeIncomeHistoryTable = ({ data }) => {
  /* data fetch by RTK */
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "userId",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "full_name",
      label: "Full Name",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "packages",
      label: "package",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 100 : 40,
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
