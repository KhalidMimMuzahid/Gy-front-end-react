import React from "react";
import Button from "../../../../components/Button";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  {
    id: "userId",
    label: "User ID",
    minWidth: window.innerWidth > 476 ? 100 : 40,
  },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "sponsorId",
    label: "Sponsor ID",
    minWidth: window.innerWidth > 476 ? 80 : 40,
  },
  {
    id: "active_package",
    label: "Package",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "email",
    label: "Email",
    minWidth: window.innerWidth > 476 ? 100 : 50,
  },
  {
    id: "joiningDate",
    label: "Joining Date",
    minWidth: window.innerWidth > 476 ? 120 : 40,
  },
  {
    id: "activationDate",
    label: "Activation Date",
    minWidth: window.innerWidth > 476 ? 120 : 40,
  },
  {
    id: "action",
    label: "Action",
    minWidth: window.innerWidth > 476 ? 80 : 50,
  },
];

const ActiveMemberTable = ({ data, blockHandler }) => {
  function createData(
    sn,
    userId,
    fullName,
    sponsorId,
    active_package,
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
      active_package,
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
      d?.packageInfo ? "₹" + d?.packageInfo?.amount?.toFixed(4) : "N/A",
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
            color: d?.isActive ? "white" : "#c6c6c6",
            cursor: d?.isActive ? "pointer" : "no-drop",
            backgroundColor: d?.isActive
              ? "rgb(254 0 0)"
              : "rgb(152 147 147)",
          }}
          disabled={d?.isActive ? false : true}
        >
          {d?.isActive ? "Block" : "Blocked"}
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

export default ActiveMemberTable;
