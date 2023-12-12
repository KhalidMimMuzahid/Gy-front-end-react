import React from "react";
import DataTable from "../../../../../components/DataTable";

const columns = [
  { id: "userId", label: "User Id", minWidth: 20 },
  { id: "period", label: "Period", minWidth: 20 },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 20,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 20,
  },
  {
    id: "contractCount",
    label: "Contract Count",
    minWidth: 20,
  },
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
    createData(d?.userId,d?.period,d?.fullName,d?.date,d?.contractCount,d?.color,d?.number,d?.totalContractMoney)
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
