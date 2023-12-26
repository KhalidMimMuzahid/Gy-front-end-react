import React from "react";
import DataTable from "../../../../components/DataTable";
// import { useTopupHistoryQuery } from "../../../../Services/topupApi";

const TopupHistoryTable = ({ data }) => {
  const columns = [
    { id: "sr", label: "Sr.", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 150 : 40,
    },
    {
      id: "packages",
      label: "Self Investment",
      minWidth: window.innerWidth > 476 ? 150 : 50,
    },
    {
      id: "packageType",
      label: "Self Investment Type",
      minWidth: window.innerWidth > 476 ? 150 : 50,
    },
    {
      id: "date",
      label: "Topup Date",
      minWidth: window.innerWidth > 476 ? 120 : 50,
    },
    {
      id: "status",
      label: "Status",
      minWidth: window.innerWidth > 476 ? 120 : 40,
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
