import React from "react";
import DataTable from "../../../../../components/DataTable";

const columns = [
  { id: "periodId", label: "Period", minWidth: 20 },
  { id: "price", label: "Price", minWidth: 50 },
  {
    id: "result",
    label: "Result",
    minWidth: 250,
  },
];

const AllPeriodRecordTable = ({ data }) => {
  // console.log({ data });
  function getBackgroundColor(index) {
    switch (index % 10) {
      case 0:
        return "linear-gradient(to bottom left, #ff1100 50%, #9C28B1 0)";
      case 1:
        return "green";
      case 2:
        return "red";
      case 3:
        return "green";
      case 4:
        return "red";
      case 5:
        return "linear-gradient(to bottom left, #0c910c 50%, #9C28B1 0)";
      case 6:
        return "red";
      case 7:
        return "green";
      case 8:
        return "red";
      case 9:
        return "green";
      default:
        return "transparent";
    }
  }

  function createData(periodId, price, option) {
    return {
      periodId,
      price,
      option,
      result: (
        <div style={{ display: "flex", gap: "5px" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              style={{
                background:
                  Number(option?.slice(1)) - 1 === i
                    ? getBackgroundColor(i)
                    : "",
                width: "20px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0 }}>{i}</p>
            </div>
          ))}
        </div>
      ),
    };
  }

  const rows = data?.map((d, index) =>
    createData(d?.periodId, d?.price, d?.option)
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

export default AllPeriodRecordTable;
