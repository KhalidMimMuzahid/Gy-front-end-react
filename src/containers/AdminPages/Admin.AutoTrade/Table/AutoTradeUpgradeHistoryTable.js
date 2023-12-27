import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoTradeUpgradeHistoryTable = ({ data }) => {
  /* data fetch by RTK */
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "userId",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "full_name",
      label: "Full Name",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "sponsor_id",
      label: "Sponsor ID",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "upgrade_by",
      label: "Upgrade By",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "packages",
      label: "package",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "start_date",
      label: "Start Date",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "end_date",
      label: "End Date",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
  ];

  function createData(
    sn,
    userId,
    full_name,
    sponsor_id,
    upgrade_by,
    packages,
    start_date,
    end_date
  ) {
    return {
      sn,
      userId,
      full_name,
      sponsor_id,
      upgrade_by,
      packages,
      start_date,
      end_date,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      d?.sponsorId,
      d?.upgradeBy === "self" ? "Self" : d?.upgradeBy,
      `₹${d?.packages} ${d?.privilege ? "-" + d?.privilege : " "}`,
      d?.startDate,
      d?.endDate
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

export default AutoTradeUpgradeHistoryTable;
