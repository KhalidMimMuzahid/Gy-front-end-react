import React from "react";
import DataTable from "../../../../components/DataTable";

const LevelIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "income_from_user_id",
      label: "Income From User ID",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "level",
      label: "Level",
      minWidth: window.innerWidth > 476 ? 100 : 30,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: window.innerWidth > 476 ? 80 : 40,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "transaction_id",
      label: "Transaction ID",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
  ];

  function createData(
    sn,
    income_from_user_id,
    level,
    amount,
    date,
    transaction_id
  ) {
    return { sn, income_from_user_id, level, amount, date, transaction_id };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.incomeFrom,
      d?.level,
      "₹" + Number(d?.amount).toFixed(4),
      d?.date,
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
