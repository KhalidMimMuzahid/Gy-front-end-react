import React from "react";
import DataTable from "../../../components/DataTable";
import { useRoiIncomeDataUserQuery } from "../../../Services/earningApi";

// const dataJson = [
//   {
//     id: "01",
//     txnid: "7sf4sfjdfjser",
//     amount: "$4875",
//     growth: "$548",
//     remarks: "75",
//     status: "Pending",
//     date: "09/03/2022",
//   },
//   {
//     id: "02",
//     txnid: "f4d5dsfs",
//     amount: "$4875",
//     growth: "$548",
//     remarks: "75",
//     status: "Pending",
//     date: "09/03/2022",
//   },
//   {
//     id: "03",
//     txnid: "74d8fd8f",
//     amount: "$4875",
//     growth: "$548",
//     remarks: "75",
//     status: "Pending",
//     date: "09/03/2022",
//   },
// ];

// const columns = [
//   { id: "id", label: "ID #", minWidth: 50 },
//   { id: "txnid", label: "Txn ID", minWidth: 100 },
//   {
//     id: "amount",
//     label: "Amount",
//     minWidth: 100,
//   },
//   {
//     id: "growth",
//     label: "Growth",
//     minWidth: 100,
//   },
//   {
//     id: "remarks",
//     label: "Remarks",
//     minWidth: 100,
//   },
//   {
//     id: "status",
//     label: "Status",
//     minWidth: 100,
//   },
//   {
//     id: "date",
//     label: "Date",
//     minWidth: 100,
//   },
// ];

// function createData(id, txnid, amount, growth, remarks, status, date) {
//   return { id, txnid, amount, growth, remarks, status, date };
// }

// const rows = dataJson.map((d) =>
//   createData(d.id, d.txnid, d.amount, d.growth, d.remarks, d.status, d.date)
// );

const MyTopupTable = () => {
  const { data } = useRoiIncomeDataUserQuery();
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "packages", label: "Package", minWidth: 100 },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
    },
    {
      id: "roi_per_day",
      label: "ROI Per Day",
      minWidth: 110,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "total_amount",
      label: "Total Amount",
      minWidth: 110,
    },
    {
      id: "transaction_id",
      label: "Transaction ID",
      minWidth: 100,
    },
  ];

  function createData(
    sn,
    packages,
    date,
    roi_per_day,
    amount,
    total_amount,
    transaction_id
  ) {
    return {
      sn,
      packages,
      date,
      roi_per_day,
      amount,
      total_amount,
      transaction_id,
    };
  }
  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d.package,
      d.date,
      d.roi_per_day,
      d.amount,
      d.total_amount,
      d.transaction_id
    )
  );
  
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={5}
      tableHeight={440}
      className="common_table"
    />
  );
};

export default MyTopupTable;
