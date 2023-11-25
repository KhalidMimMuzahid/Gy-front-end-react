import React from "react";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "top_up_by", label: "Top up by", minWidth: 100 },
  {
    id: "activated_id",
    label: "activated ID ",
    minWidth: 100,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
];

const UserTopupHistoryTable = ({ data }) => {
  function createData(sr, top_up_by, activated_id, amount, date) {
    return {
      sr,
      top_up_by,
      activated_id,
      amount,
      date,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.topup_by ? (d?.topup_by === d?.user_id ? "Self" : d?.topup_by) : "N/A",
      d?.user_id,
      "₹" + parseInt(d?.packages)?.toFixed(4),
      new Date(d?.time?.date).toDateString()
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

export default UserTopupHistoryTable;
