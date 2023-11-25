import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoTradeUpgradeHistoryTable = ({ data }) => {
  /* data fetch by RTK */
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userId", label: "User ID", minWidth: 100 },
    {
      id: "full_name",
      label: "Full Name",
      minWidth: 80,
    },
    {
      id: "sponsor_id",
      label: "Sponsor ID",
      minWidth: 120,
    },
    {
      id: "upgrade_by",
      label: "Upgrade By",
      minWidth: 120,
    },
    {
      id: "packages",
      label: "package",
      minWidth: 120,
    },
    {
      id: "start_date",
      label: "Start Date",
      minWidth: 100,
    },
    {
      id: "end_date",
      label: "End Date",
      minWidth: 100,
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
