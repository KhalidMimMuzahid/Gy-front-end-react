import React from "react";
import Button from "../../../../components/Button";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  {
    id: "userId",
    label: "User ID",
    minWidth: window.innerWidth > 476 ? 100 : 30,
  },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "sponsorId",
    label: "Sponsor ID",
    minWidth: window.innerWidth > 476 ? 100 : 30,
  },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: window.innerWidth > 476 ? 80 : 40,
  },
  {
    id: "email",
    label: "Email",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "joiningDate",
    label: "Joining Date",
    minWidth: window.innerWidth > 476 ? 120 : 50,
  },
  {
    id: "activationDate",
    label: "Activation Date",
    minWidth: window.innerWidth > 476 ? 120 : 50,
  },
  {
    id: "action",
    label: "Action",
    minWidth: window.innerWidth > 476 ? 80 : 40,
  },
];

const BlockedMemberTable = ({ data, blockHandler, deleteHandler }) => {
  function createData(
    sn,
    userId,
    fullName,
    sponsorId,
    mobile,
    email,
    joiningDate,
    activationDate,
    action
  ) {
    return {
      sn,
      userId,
      fullName,
      sponsorId,
      mobile,
      email,
      joiningDate,
      activationDate,
      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.fullName,
      d?.sponsorId,
      d?.mobile,
      d?.email,
      d?.joiningDate,
      d?.activationDate ? d?.activationDate : "--",
      <p style={{ display: "flex" }}>
        <Button
          type="button"
          onClick={() => blockHandler(d)}
          style={{
            marginRight: "5px",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            color: "white",
            cursor: "pointer",
            backgroundColor: "rgb(41 156 13)",
          }}
        >
          Unblock
        </Button>
        <Button
          type="button"
          onClick={() => deleteHandler(d)}
          style={{
            marginRight: "5px",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            pointerEvents: d?.deleteStatus ? "none" : "auto",
            color: !d?.deleteStatus ? "white" : "#c6c6c6",
            cursor: !d?.deleteStatus ? "pointer" : "no-drop",
            backgroundColor: !d?.deleteStatus
              ? "rgb(254 0 0)"
              : "rgb(152 147 147)",
          }}
        >
          {d?.deleteStatus ? "Deleted" : "Delete"}
        </Button>
      </p>
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

export default BlockedMemberTable;
