import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "userId", label: "Transfer From", minWidth: 100 },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "transfer_to",
    label: "Transfer To",
    minWidth: 100,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
];

const GiftIncomeTransferHistoryTable = ({ showDetails, data }) => {
  function createData(sr, userId, amount, transfer_to, name, date) {
    return {
      sr,
      userId,
      amount,
      transfer_to,
      name,
      date,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      "Admin",
      "₹" + parseInt(d?.amount)?.toFixed(4),
      d?.user_id,
      d?.name,
      new Date(d?.createdAt).toDateString()
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

export default GiftIncomeTransferHistoryTable;
