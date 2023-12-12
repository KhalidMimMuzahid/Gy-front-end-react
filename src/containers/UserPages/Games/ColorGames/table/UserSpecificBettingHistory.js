import React from "react";
import DataTable from "../../../../../components/DataTable";

const columns = [
  { id: "userId", label: "userId", minWidth: 20 },
  { id: "period", label: "period", minWidth: 50 },
  {
    id: "fullName",
    label: "fullName",
    minWidth: 50,
  },
  {
    id: "date",
    label: "date",
    minWidth: 50,
  },
  {
    id: "contractCount",
    label: "contractCount",
    minWidth: 50,
  },
  {
    id: "color",
    label: "color",
    minWidth: 50,
  },
  {
    id: "number",
    label: "number",
    minWidth: 50,
  },
  {
    id: "totalContractMoney",
    label: "totalContractMoney",
    minWidth: 50,
  },
];

const UserSpecificBettingHistory = ({ data }) => {
  function createData(
    userId,
    period,
    fullName,
    date,
    contractCount,
    color,
    number,
    totalContractMoney
  ) {
    return {
      userId,
      period,
      fullName,
      date,
      contractCount,
      color,
      number,
      totalContractMoney,
    };
  }

  const rows = data?.map((d, index) =>
    // console.log(d),
    createData(d?.userId)
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={6}
      tableHeight={440}
      className='common_table'
    />
  );
};

export default UserSpecificBettingHistory;
