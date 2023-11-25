import React from "react";
import DataTable from "../../../../components/DataTable";

const StakingLevelIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "user_id",
      label: "User Id",
      minWidth: 120,
    },
    {
      id: "income_from",
      label: "Income From UserId",
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
    {
      id: "transectionId",
      label: "Transection ID",
      minWidth: 120,
    },
  ];

  function createData(sn, user_id, income_from, amount, date, transectionId) {
    return { sn, user_id, income_from, amount, date, transectionId };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.incomeFrom,
      "₹" + d?.amount,
      d?.incomeDate,
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

export default StakingLevelIncomeTable;
