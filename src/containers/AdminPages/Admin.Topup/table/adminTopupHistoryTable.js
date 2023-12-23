import React from "react";
import DataTable from "../../../../components/DataTable";
// import { useTopupHistoryQuery } from "../../../../Services/topupApi";

const AdminTopupHistoryTable = ({ data }) => {
  const columns = [
    { id: "sr", label: "Sr.", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 150 : 60,
    },
    {
      id: "user_fullname",
      label: "Full Name",
      minWidth: window.innerWidth > 476 ? 220 : 60,
    },
    {
      id: "packages",
      label: "Package",
      minWidth: window.innerWidth > 476 ? 120 : 60,
    },
    {
      id: "upgradepackage",
      label: "Upgrade Package",
      minWidth: window.innerWidth > 476 ? 150 : 60,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: window.innerWidth > 476 ? 80 : 40,
    },
    {
      id: "date",
      label: "Topup Date",
      minWidth: window.innerWidth > 476 ? 120 : 50,
    },
  ];

  function createData(
    sr,
    user_id,
    user_fullname,
    packages,
    upgradepackage,
    amount,
    date
  ) {
    return {
      sr,
      user_id,
      user_fullname,
      packages,
      upgradepackage,
      amount,
      date,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.userFullName,
      "₹" + d?.package?.amount,
      d?.upgradepackage?.amount ? "₹" + d?.upgradepackage?.amount : "N/A",
      d?.amount ? "₹" + d?.amount : "₹" + d?.package?.amount,
      d?.upgradepackage?.date ? d?.upgradepackage?.date : d?.package?.date,
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
      perPageShow={10}
      tableHeight={550}
      className='common_table'
    />
  );
};

export default AdminTopupHistoryTable;
