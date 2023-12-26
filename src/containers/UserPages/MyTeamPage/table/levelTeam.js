import React from "react";
import DataTable from "../../../../components/DataTable";

const LevelTeam = ({ data }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 80 : 40,
    },
    {
      id: "name",
      label: "Full Name",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "sponsor_id",
      label: "Sponsor ID",
      minWidth: window.innerWidth > 476 ? 100 : 40,
    },
    {
      id: "level",
      label: "Level",
      minWidth: window.innerWidth > 476 ? 100 : 30,
    },
    {
      id: "joining_date",
      label: "Joining Date",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "activation_date",
      label: "Activation date",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
  ];

  function createData(
    sn,
    user_id,
    name,
    sponsor_id,
    level,
    joining_date,
    activation_date
  ) {
    return {
      sn,
      user_id,
      name,
      sponsor_id,
      level,
      joining_date,
      activation_date,
    };
  }
  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      d?.sponsorId,
      d?.level,
      d?.joiningDate,
      d?.activationDate ? d?.activationDate : "N/A"
    )
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={6}
      tableHeight={440}
      className="common_table"
    />
  );
};

export default LevelTeam;
