import React from "react";
import DataTable from "../../../../components/DataTable";

const LevelIncomeTable = ({ data, showDetails }) => {


  console.log({ data });
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
      id: "type",
      label: "Type",
      minWidth: 100,
    },
    {
      id: "transactionID",
      label: "TransactionId",
      minWidth: 100,
    },
  ];

  function createData(
    sn,
    income_from_user_id,
    level,
    amount,
    date,
    type,
    transactionID
  ) {
    return {
      sn,
      income_from_user_id,
      level,
      amount,
      date,
      type,
      transactionID,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.incomeFrom,
      d?.level,
      "₹" + Number(d?.amount).toFixed(4),
      d?.date || "this is date",
      d?.type || "profit-share",
      d?.transactionID || "xxx"
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

export default LevelIncomeTable;
