import React from "react";
import DataTable from "../../../../components/DataTable";
import { useNavigate } from "react-router-dom";

const GlobalIncomeTable = ({ data }) => {
  const nagivate = useNavigate();
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userid", label: "User ID", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
    },
    {
      id: "transaction_id",
      label: "Transaction ID",
      minWidth: 100,
    },
  ];

  function createData(sn, userid, date, amount, transaction_id) {
    return { sn, userid, date, amount, transaction_id };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.user_id,
      d?.date,
      "₹" + d?.amount,
      <p
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => {
          navigator.clipboard.writeText(d?.transactionId);
          nagivate("/dashboard/member/team-statistics");
        }}
      >
        {d?.transactionId}
      </p>
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

export default GlobalIncomeTable;
