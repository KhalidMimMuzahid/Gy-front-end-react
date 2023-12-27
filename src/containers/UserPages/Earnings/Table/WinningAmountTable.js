import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "serialNo", label: "S/N", minWidth: 20 },
  // { id: "userid", label: "User Id", minWidth: 20 },
  {
    id: "periodId",
    label: "Period Id",
    minWidth: 20,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 20,
  },

  {
    id: "date",
    label: "Date",
    minWidth: 50,
  },
  {
    id: "time",
    label: "Time",
    minWidth: 50,
  },
  {
    id: "transactionId",
    label: "TID",
    minWidth: 50,
  },
];

const WinningAmountHistory = ({ data }) => {
  console.log({ data });
  function createData(
    serialNo,
    // userid,
    periodId,
    amount,
    date,
    time,
    transactionId
  ) {
    return {
      serialNo,
      // userid,
      periodId,
      amount,
      date,
      time,
      transactionId,
    };
  }

  const rows = data?.data?.map((d, index) =>
    // console.log(d)
    createData(
      index + 1,
      // d?.userId,
      d?.period,
      d?.winningAmount,
      d?.date,
      d?.time,
      d?.transactionId
    )
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

export default WinningAmountHistory;
