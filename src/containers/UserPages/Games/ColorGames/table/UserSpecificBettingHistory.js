import React from "react";
import DataTable from "../../../../../components/DataTable";

const columns = [
  { id: "periodId", label: "Period", minWidth: 20 },
  { id: "price", label: "Price", minWidth: 50 },
  {
    id: "result",
    label: "Result",
    minWidth: 250,
  },
];

const UserSpecificBettingHistory = ({ data }) => {

  function createData(periodId, price, number,result) {
    return {
      periodId,
      price,
      number,
      result,
      
    };
  }

  const rows = data?.map((d, index) =>
    createData(d?.periodId, d?.price, d?.number)
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
