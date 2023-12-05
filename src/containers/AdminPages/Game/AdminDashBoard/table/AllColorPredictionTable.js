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

const AllColorPredictionTable = ({ data, showDetails, statusChange }) => {
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
      d?.color,

      d?.number,
      d?.numberOfUser,

      d?.amount,
      // d?.transactionHash ? (
      //   <a
      //     href={`https://bscscan.com/tx/${d?.transaction_hash}`}
      //     target='_blank'
      //     rel='noreferrer'
      //     style={{
      //       userSelect: "none",
      //       cursor: "pointer",
      //       textDecoration: "underline",
      //       color: `var(--text-p-color)`,
      //     }}
      //   >
      //     {d?.hash?.slice(0, 5) + "..." + d?.hash?.slice(d?.hash?.length - 5)}
      //   </a>
      // ) : (
      //   "N/A"
      // ),
      <span>
        <Checkbox color="primary" onChange={statusChange(d)} />
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
