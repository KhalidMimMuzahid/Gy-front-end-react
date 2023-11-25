import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoTradeUsersTable = ({data}) => {
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
      id: "date",
      label: "Date",
      minWidth: 100,
    },
  ];

  function createData(sn, userId, full_name, sponsor_id, date) {
    return { sn, userId, full_name,sponsor_id, date };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      d?.sponsorId,
      d?.date
    )
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={10}
      tableHeight={600}
      className="common_table"
    />
  );
};

export default AutoTradeUsersTable;
