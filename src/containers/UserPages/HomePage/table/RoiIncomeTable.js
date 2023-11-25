import React from "react";
import DataTable from "../../../../components/DataTable";
import { useRoiIncomeDataUserQuery } from "../../../../Services/earningApi";

const RoiInocmeTable = () => {
  const { data } = useRoiIncomeDataUserQuery();
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "packages", label: "Package", minWidth: 100 },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
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
  ];

  function createData(sn, packages, date, roi_per_day, amount, total_amount) {
    return {
      sn,
      packages,
      date,
      roi_per_day,
      amount,
      total_amount,
    };
  }
  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      "₹" + d?.packages?.toFixed(4),
      new Date(d.date).toDateString(),
      d.roi_per_day + "%",
      d.amount?.toFixed(4),
      d.total_amount?.toFixed(4)
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

export default RoiInocmeTable;
