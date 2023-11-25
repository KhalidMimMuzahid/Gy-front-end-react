import React from "react";
import DataTable from "../../../../components/DataTable";

const LevelIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userid", label: "User ID", minWidth: 100 },
    { id: "income_from_user_id", label: "Income From User ID", minWidth: 100 },
    { id: "level", label: "Level", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "packages",
      label: "Package",
      minWidth: 80,
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

  function createData(
    sn,
    userid,
    income_from_user_id,
    level,
    date,
    amount,
    packages,
    transaction_id
  ) {
    return {
      sn,
      userid,
      income_from_user_id,
      level,
      date,
      amount,
      packages,
      transaction_id,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.incomeFrom,
      d?.level,
      d?.date,
      "₹" + Number(d?.amount).toFixed(4),
      "₹" + d?.selfPackageInfo?.amount,
      <p
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => showDetails(d)}
      >
        {d?.transactionID}
      </p>
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
