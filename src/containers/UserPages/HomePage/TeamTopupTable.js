import React from "react";
import DataTable from "../../../components/DataTable";
const dataJson = [
  {
    id: "01",
    txnid: "f4d5dsfs",
    amount: "$4875",
    remarks: "75",
    status: "Pending",
    date: "09/03/2022",
  },
  {
    id: "02",
    txnid: "f4d5dsfs",
    amount: "$4875",
    remarks: "75",
    status: "Pending",
    date: "09/03/2022",
  },
  {
    id: "03",
    txnid: "f4d5dsfs",
    amount: "$4875",
    remarks: "75",
    status: "Pending",
    date: "09/03/2022",
  },
];

const columns = [
  { id: "id", label: "ID #", minWidth: 30 },
  { id: "txnid", label: "Txn ID", minWidth: 100 },
  {
    id: "amount",
    label: "Amount (TRX)",
    minWidth: 100,
  },
  {
    id: "remarks",
    label: "Remarks",
    minWidth: 50,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
];

function createData(id, txnid, amount, remarks, status, date) {
  return { id, txnid, amount, remarks, status, date };
}

const rows = dataJson.map((d) =>
  createData(d.id, d.txnid, d.amount, d.remarks, d.status, d.date)
);

const TeamTopupTable = () => {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={5}
      tableHeight={300}
      className="common_table"
    />
  );
};

export default TeamTopupTable;
