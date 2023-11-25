import React from "react";
import DataTable from "../../../../components/DataTable";

const RewardTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "user_id",
      label: "User Id",
      minWidth: 120,
    },
    {
      id: "full_name",
      label: "Full Name",
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

  function createData(sn, user_id, full_name, amount, date, transectionId) {
    return { sn, user_id, full_name, amount, date, transectionId };
  }
  const rows = data?.map((d, i) =>
    createData(
      1 + i,
      d?.userId,
      d?.fullName,
      "₹" + d?.amount,
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
      perPageShow={10}
      tableHeight={600}
      className='common_table'
    />
  );
};

export default RewardTable;
