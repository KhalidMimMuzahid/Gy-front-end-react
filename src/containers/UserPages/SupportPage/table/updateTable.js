import React from "react";
import DataTable from "../../../../components/DataTable";

const UpdateNewsTable = ({ data, showMessage }) => {
  const columns = [
    { id: "id", label: "S.N", minWidth: 20 },
    { id: "title", label: "Title", minWidth: 100 },
    {
      id: "description",
      label: "Description",
      minWidth: 80,
    },
  ];

  function createData(id, title, description) {
    return {
      id,
      title,
      description,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.title?.length > 40 ? d?.title?.slice(0, 40 - 1) + "…" : d?.title,
      <span
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => showMessage(d)}
      >
        {d?.description?.length > 40
          ? d?.description?.slice(0, 40 - 1) + "…"
          : d?.description}
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

export default UpdateNewsTable;
