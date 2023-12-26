import React from "react";
import DataTable from "../../../../components/DataTable";
import { useRoiIncomeDataUserQuery } from "../../../../Services/earningApi";

const RoiInocmeTable = () => {
  const { data } = useRoiIncomeDataUserQuery();
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    {
      id: "packages",
      label: "Package",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "date",
      label: "Date",
      minWidth: window.innerWidth > 476 ? 120 : 50,
    },
    {
      id: "roi_per_day",
      label: "ROI Per Day",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: window.innerWidth > 476 ? 80 : 40,
    },
    {
      id: "total_amount",
      label: "Total Amount",
      minWidth: window.innerWidth > 476 ? 100 : 40,
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
