import React from "react";
import DataTable from "../../../../components/DataTable";

const RankIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userid", label: "User ID", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 120,
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
      id: "transectionId",
      label: "Transection Id",
      minWidth: 120,
    },
  ];

  function createData(sn, userid, amount, packages, date, transectionId) {
    return { sn, userid, amount, packages, date, transectionId };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      "₹" + d?.rewardAmount?.toFixed(4),
      d?.rank?.toUpperCase(),
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
