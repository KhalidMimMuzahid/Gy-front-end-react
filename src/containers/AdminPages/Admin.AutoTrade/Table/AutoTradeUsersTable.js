import React from "react";
import DataTable from "../../../../components/DataTable";

const AutoTradeUsersTable = ({data}) => {
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
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 100 : 40,
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
