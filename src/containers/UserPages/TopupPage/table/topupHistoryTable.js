import React from "react";
import DataTable from "../../../../components/DataTable";
// import { useTopupHistoryQuery } from "../../../../Services/topupApi";

const TopupHistoryTable = ({ data }) => {
  const columns = [
    { id: "sr", label: "Sr.", minWidth: 20 },
    { id: "user_id", label: "User ID", minWidth: 150 },
    {
      id: "packages",
      label: "Self Investment",
      minWidth: 150,
    },
    {
      id: "packageType",
      label: "Self Investment Type",
      minWidth: 150,
    },
    {
      id: "date",
      label: "Topup Date",
      minWidth: 120,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 80,
    },
  ];

  function createData(sr, user_id, packages, packageType, date, status) {
    return {
      sr,
      user_id,
      packages,
      packageType,
      date,
      status,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      "₹" + d?.packageInfo?.amount,
      d?.packageType,
      d?.packageInfo?.date,
      <span
        style={{
          borderRadius: "50px",
          padding: "5px 8px",
          fontSize: "13px",
          textTransform: "capitalize",
          backgroundColor: "rgba(28,213,174,.2)",
          color: "#38cab3",
        }}
      >
        success
      </span>
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

export default TopupHistoryTable;
