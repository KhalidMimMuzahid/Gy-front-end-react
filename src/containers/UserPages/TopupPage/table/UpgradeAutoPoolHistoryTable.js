import React from "react";
import DataTable from "../../../../components/DataTable";

const UpgradeAutoPoolHistoryTable = ({ data }) => {
  const columns = [
    { id: "sr", label: "Sr.", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "upgradeAutopool",
      label: "Upgrade Autopool",
      minWidth: window.innerWidth > 476 ? 150 : 50,
    },
    {
      id: "upgradeAmount",
      label: "Upgrade Amount",
      minWidth: window.innerWidth > 476 ? 150 : 40,
    },
    {
      id: "date",
      label: "Topup Date",
      minWidth: window.innerWidth > 476 ? 120 : 40,
    },
  ];

  function createData(sr, user_id, upgradeAutopool, upgradeAmount, date) {
    return {
      sr,
      user_id,
      upgradeAutopool,
      upgradeAmount,
      date,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.Username,
      d?.updatedautopool,
      "₹" + d?.amount,
      new Date(d.createdAt).toDateString()
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

export default UpgradeAutoPoolHistoryTable;
