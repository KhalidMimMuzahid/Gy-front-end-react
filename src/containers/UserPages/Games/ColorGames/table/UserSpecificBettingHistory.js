import React from "react";
import DataTable from "../../../../../components/DataTable";
import { getColoAndNumberAccordingToXOption } from "../../../../../utils/function/getColoAndNumberAccordingToXOption";

const columns = [
  { id: "userId", label: "User Id", minWidth: 20 },
  { id: "period", label: "Period", minWidth: 20 },
  // {
  //   id: "fullName",
  //   label: "Full Name",
  //   minWidth: 20,
  // },
  {
    id: "date",
    label: "Date",
    minWidth: 20,
  },
  // {
  //   id: "contractCount",
  //   label: "Contract Count",
  //   minWidth: 20,
  // },
  {
    id: "color",
    label: "Color",
    minWidth: 50,
  },
  {
    id: "number",
    label: "Number",
    minWidth: 50,
  },
  {
    id: "totalContractMoney",
    label: "Total Contract Money",
    minWidth: 50,
  },
  {
    id: "winningAmount",
    label: "Winning Amount",
    minWidth: 50,
  },
];

const UserSpecificBettingHistory = ({ data }) => {
  console.log({ mywBettingHistory: data });
  function createData(
    userId,
    period,
    date,
    totalContractMoney,
    option,
    winningAmount
  ) {
    const { color, number } = getColoAndNumberAccordingToXOption(option);
    return {
      userId,
      period,
      // fullName,
      date,
      // contractCount,
      color,
      number,
      totalContractMoney,
      winningAmount,
    };
  }

  const rows = data?.map((d, index) =>
    // console.log(d)
    createData(
      d?.userId,
      d?.period,
      d?.date,
      d?.totalContractMoney,
      d?.option,
      <span style={{ color: d?.winningAmount ? "black" : "red" }}>
        {" "}
        {d?.winningAmount || "loss"}
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

export default UserSpecificBettingHistory;
