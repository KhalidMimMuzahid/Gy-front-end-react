import React from "react";
import DataTable from "../../../../components/DataTable";

const DirectTable = ({ data }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "user_id",
      label: "User ID",
      minWidth: 40,
    },
    {
      id: "name",
      label: "Full Name",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    // {
    //   id: "mobile",
    //   label: "Mobile",
    //   minWidth: 100,
    // },
    // {
    //   id: "email",
    //   label: "Email",
    //   minWidth: 100,
    // },
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
    // mobile,
    // email,
    level,
    joining_date,
    activation_date
  ) {
    return {
      sn,
      user_id,
      name,
      // mobile,
      // email,
      level,
      joining_date,
      activation_date,
    };
  }

  const rows = data?.level?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      // d?.mobile,
      // d?.email,
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

export default DirectTable;
