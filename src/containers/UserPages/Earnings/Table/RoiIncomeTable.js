import React from "react";
import DataTable from "../../../../components/DataTable";

const RoiIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "userId",
      label: "User ID",
      minWidth: 120,
    },
    {
      id: "fullName",
      label: "Full Name",
      minWidth: 120,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 120,
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

  function createData(sn, userId, fullName, amount, date, transectionId) {
    return { sn, userId, fullName, amount, date, transectionId };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      "₹" + Number(d?.commissionAmount).toFixed(4),
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
      perPageShow={10}
      tableHeight={600}
      className='common_table'
    />
  );
};

export default RoiIncomeTable;
