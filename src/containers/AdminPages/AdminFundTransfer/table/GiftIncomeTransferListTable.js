import React from "react";
import Button from "../../../../components/Button";
import DataTable from "../../../../components/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "userId", label: "userId", minWidth: 100 },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "sponsor_id",
    label: "Sponsor ID",
    minWidth: 100,
  },
  {
    id: "gifted_date",
    label: "Gifted Date",
    minWidth: 100,
  },
  {
    id: "join_date",
    label: "Join Date",
    minWidth: 120,
  },
  // {
  //   id: "action",
  //   label: "Gift Amount Send",
  //   minWidth: 120,
  // },
];

const GiftIncomeTransferListTable = ({ sendGift, data, addGiftSingleUser }) => {
  function createData(
    sr,
    userId,
    name,
    sponsor_id,
    gifted_date,
    join_date,
    action
  ) {
    return {
      sr,
      userId,
      name,
      sponsor_id,
      gifted_date,
      join_date,
      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.user_id,
      d?.name,
      d?.sponsor_id,
      new Date(parseInt(d?.gifted_date)).toDateString(),
      new Date(parseInt(d?.join_date)).toDateString(),
      <Button
        type="button"
        onClick={() => addGiftSingleUser({ id: d?.user_id })}
        style={{
          marginRight: "5px",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          // color: d?.user_status ? "white" : "#c6c6c6",
          // cursor: d?.user_status ? "pointer" : "no-drop",
          // backgroundColor: d?.user_status ? "rgb(41 156 13)" : "rgb(152 147 147)",
          color: "white",
          cursor: "pointer",
          backgroundColor: "rgb(41 156 13)",
        }}
      >
        Gift Send
      </Button>
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

export default GiftIncomeTransferListTable;
