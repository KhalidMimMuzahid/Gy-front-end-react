import React from "react";
import DataTable from "../../../../components/DataTable";
import { useLevelTeamListQuery } from "../../../../Services/userApi";

const TeamTopup = () => {
  const { data } = useLevelTeamListQuery();

  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: window.innerWidth > 476 ? 120 : 40,
    },
    {
      id: "level",
      label: "Level",
      minWidth: 20,
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

  function createData(sn, user_id, level, joining_date, activation_date) {
    return {
      sn,
      user_id,
      level,
      joining_date,
      activation_date,
    };
  }

  const rows = data?.level
    ?.slice(0, 5)
    .map((d, i) =>
      createData(
        i + 1,
        d.user_id,
        d.level,
        new Date(d.joining_date).toDateString(),
        d?.user?.topup_activation_date
          ? parseInt(d?.user?.topup_activation_date)
            ? new Date(parseInt(d?.user?.topup_activation_date)).toDateString()
            : d?.user?.topup_activation_date
          : "--"
      )
    );
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={4}
      tableHeight={440}
      className="common_table"
    />
  );
};

export default TeamTopup;
