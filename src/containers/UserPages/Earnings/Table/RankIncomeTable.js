import React from "react";
import DataTable from "../../../../components/DataTable";

const RankIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "level",
      label: "Rank",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: window.innerWidth > 476 ? 80 : 40,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "transaction_id",
      label: "Transaction ID",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
  ];

  function createData(sn, level, amount, date, transaction_id) {
    return { sn, level, amount, date, transaction_id };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.rank.toUpperCase(),
      "₹" + d?.rewardAmount,
      d?.date,
      <p
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => showDetails(d)}
      >
        {d?.transactionId}
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

export default RankIncomeTable;
