import React from "react";
import DataTable from "../../../../components/DataTable";
const columns = [
  { id: "sn", label: "S.N.", minWidth: 20 },
  { id: "user_id", label: "user ID", minWidth: 40 },
  {
    id: "user_name",
    label: "User Name",
    minWidth: window.innerWidth > 476 ? 80 : 40,
  },
  {
    id: "email",
    label: "Email Address",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "message",
    label: "Message",
    minWidth: window.innerWidth > 476 ? 100 : 60,
  },
];

const AdminContactHistory = ({ data, showMessage }) => {
  function createData(sn, user_id, user_name, email, message) {
    return {
      sn,
      user_id,
      user_name,
      email,
      message,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.user_name,
      d?.email,
      <span
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => showMessage(d)}
      >
        {d?.message?.length > 40
          ? d?.message?.slice(0, 40 - 1) + "..."
          : d?.message}
      </span>
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

export default AdminContactHistory;
