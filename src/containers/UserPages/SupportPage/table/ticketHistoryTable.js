import React from "react";
import DataTable from "../../../../components/DataTable";

const TicketHistoryTable = ({ data, showImageDetails, showMessage }) => {
  const columns = [
    { id: "id", label: "S.N", minWidth: 20 },
    {
      id: "purpose",
      label: "Purpose",
      minWidth: window.innerWidth > 476 ? 100 : 50,
    },
    {
      id: "ticket_referrance",
      label: "Ticket Referrance",
      minWidth: window.innerWidth > 476 ? 80 : 50,
    },
    {
      id: "image",
      label: "Image",
      minWidth: window.innerWidth > 476 ? 80 : 50,
    },
    {
      id: "question",
      label: "Question",
      minWidth: window.innerWidth > 476 ? 80 : 50,
    },
  ];

  function createData(id, purpose, ticket_referrance, image, question) {
    return {
      id,
      purpose,
      ticket_referrance,
      image,
      question,
    };
  }
  const rows = data?.history?.map((d, i) =>
    createData(
      i + 1,
      d?.purpose,
      d?.previous_ticket_reff,
      <span
        onClick={() => showImageDetails(d)}
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        <img
          style={{ width: "30px", height: "30px" }}
          src={d?.image?.avatar}
          alt=""
        ></img>
      </span>,
      <span
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => showMessage(d)}
      >
        {d?.question?.length > 40
          ? d?.question?.slice(0, 40 - 1) + "…"
          : d?.question}
      </span>
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

export default TicketHistoryTable;
