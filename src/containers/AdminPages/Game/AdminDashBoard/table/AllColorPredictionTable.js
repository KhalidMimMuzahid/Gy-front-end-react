import React from "react";
import DataTable from "../../../../../components/DataTable";
import { Checkbox } from "@mui/material";
import "../../../../../styles/abstract/_variables.scss"

const columns = [
  { id: "color", label: "Result", minWidth: 20 },
  { id: "number", label: "Number", minWidth: 50 },
  {
    id: "numberOfUser",
    label: "Number Of User",
    minWidth: 120,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 80,
  },
  {
    id: "priceCL",
    label: "Price CL",
    minWidth: 80,
  },

  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

const AllColorPredictionTable = ({ data, isDisable, statusChange }) => {
  function createData(color, number, numberOfUser, amount, priceCL, action) {
    return {
      color,
      number,
      numberOfUser,
      amount,
      priceCL,
      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      d?.option === "y1" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "red" }}>red</span> <span>+</span>
          <span style={{ color: "violet" }}>violet</span>
        </div>
      ) : d?.option === "y2" ? (
        <span style={{ color: "green" }}>Green</span>
      ) : d?.option === "y3" ? (
        <span style={{ color: "red" }}>Red</span>
      ) : d?.option === "y4" ? (
        <span style={{ color: "green" }}>Green</span>
      ) : d?.option === "y5" ? (
        <span style={{ color: "red" }}>Red</span>
      ) : d?.option === "y6" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "green" }}>green</span> <span>+</span>
          <span style={{ color: "violet" }}>violet</span>
        </div>
      ) : d?.option === "y7" ? (
        <span style={{ color: "red" }}>Red</span>
      ) : d?.option === "y8" ? (
        <span style={{ color: "green" }}>Green</span>
      ) : d?.option === "y9" ? (
        <span style={{ color: "red" }}>Red</span>
      ) : (
        <span style={{ color: "green" }}>Green</span>
      ),

      d?.serial - 1,
      d?.numberOfUser,
      d?.amount,
      d?.priceCL,

      <span>
        <Checkbox
          style={{color:`--var(text-p-color)`}}
          // color={`$text-p-color`}
          disabled={isDisable}
          onChange={() => statusChange(d?.option)}
        />
      </span>
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

export default AllColorPredictionTable;
