import React from "react";
import DataTable from "../../../../../components/DataTable";
import { Checkbox } from "@mui/material";

const columns = [
  { id: "color", label: "Result", minWidth: 20 },
  { id: "number", label: "Number", minWidth: 50 },
  {
    id: "numberOfUser",
    label: "NumOfUser",
    minWidth: 120,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 80,
  },

  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

const AllColorPredictionTable = ({ data, isDisable, statusChange }) => {
  function createData(
    color,
    number,
    numberOfUser,
    amount,

    action
  ) {
    return {
      color,
      number,
      numberOfUser,
      amount,

      // transaction_hash,
      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      d?.color === "green" ? (
        <span style={{ color: "green" }}>{d?.color}</span>
      ) : d?.color === "red" ? (
        <span style={{ color: "red" }}>{d?.color}</span>
      ) : d?.color === "violet" ? (
        <span style={{ color: "violet" }}>{d?.color}</span>
      ) : d?.color === "red-violet" ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <span style={{ color: "red" }}>red</span> <span>+</span>{" "}
          <span style={{ color: "violet" }}>violet</span>
        </div>
      ) : d?.color === "green-violet" ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <span style={{ color: "green" }}>green</span> <span>+</span>{" "}
          <span style={{ color: "violet" }}>violet</span>
        </div>
      ) : (
        ""
      ),
      d?.number,
      d?.numberOfUser,
      d?.amount,
      <span>
        <Checkbox
          color="primary"
          disabled={isDisable}
          onChange={() => statusChange(d)}
        />
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

export default AllColorPredictionTable;
