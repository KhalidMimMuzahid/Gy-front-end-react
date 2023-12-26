import React from "react";
import DataTable from "../../../../components/DataTable";
// import { useGetAllSupportMessageQuery } from "../../../../Services/SupportApi";

const columns = [
  { id: "id", label: "S.N", minWidth: 20 },
  { id: "userName", label: "User Name", minWidth: 40 },
  { id: "email", label: "Email", minWidth: window.innerWidth > 476 ? 120 : 60 },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: window.innerWidth > 476 ? 80 : 50,
  },
  {
    id: "purpose",
    label: "Purpose",
    minWidth: window.innerWidth > 476 ? 80 : 50,
  },
  {
    id: "ticket_referrance",
    label: "Ticket Reference",
    minWidth: window.innerWidth > 476 ? 80 : 50,
  },
  {
    id: "image",
    label: "Image",
    minWidth: 60,
  },
  {
    id: "question",
    label: "Message",
    minWidth: window.innerWidth > 476 ? 120 : 60,
  },
];

const AdminTicketHistory = ({ data, showImageDetails, showMessage }) => {
  function createData(
    id,
    userName,
    email,
    mobile,
    purpose,
    ticket_referrance,
    image,
    question
  ) {
    return {
      id,
      userName,
      email,
      mobile,
      purpose,
      ticket_referrance,
      image,
      question,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.email,
      d?.mobile,
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

export default AdminTicketHistory;
