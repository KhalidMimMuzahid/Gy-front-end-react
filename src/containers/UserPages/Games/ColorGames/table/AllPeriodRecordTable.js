// import React from "react";
// import DataTable from "../../../../../components/DataTable";
// import { Checkbox } from "@mui/material";

// const columns = [
//   { id: "periodId", label: "Period", minWidth: 20 },
//   { id: "price", label: "Price", minWidth: 50 },
//   {
//     id: "number",
//     label: "Number",
//     minWidth: 120,
//   },
//   {
//     id: "color",
//     label: "Result",
//     minWidth: 50,
//   },
// ];

// const AllPeriodRecordTable = ({ data }) => {
//   function createData(periodId, price, number, color) {
//     return {
//       periodId,
//       price,
//       number,
//       color,
//     };
//   }

//   const rows = data?.map((d, index) =>
//     createData(
//       d?.periodId,
//       d?.price,
//       d?.number,
//       d?.color === "green" ? (
//         <div
//           style={{
//             backgroundColor: "green",
//             width: "20px",
//             borderRadius: "50%",
//             marginLeft: "60px",
//           }}
//         >
//           <p>'</p>
//         </div>
//       ) : d?.color === "red" ? (
//         <div
//           style={{
//             backgroundColor: "red",
//             width: "20px",
//             borderRadius: "50%",
//             marginLeft: "60px",
//           }}
//         >
//           <span>'</span>
//         </div>
//       ) : d?.color === "violet" ? (
//         <div
//           style={{
//             backgroundColor: "violet",
//             width: "20px",
//             borderRadius: "50%",
//             marginLeft: "60px",
//           }}
//         >
//           <p>'</p>
//         </div>
//       ) : d?.color === "red-violet" ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "2px",
//             // marginLeft: "60px",
//           }}
//         >
//           {" "}
//           <div
//             style={{
//               backgroundColor: "red",
//               width: "20px",
//               borderRadius: "50%",
//               marginLeft: "60px",
//             }}
//           >
//             <p>'</p>
//           </div>{" "}
//           <div></div>{" "}
//           <div
//             style={{
//               backgroundColor: "violet",
//               width: "20px",
//               borderRadius: "50%",
//             }}
//           >
//             <p>'</p>
//           </div>
//         </div>
//       ) : d?.color === "green-violet" ? (
//         <div style={{ display: "flex", flexDirection: "row", gap: "2px" }}>
//           {" "}
//           <div
//             style={{
//               backgroundColor: "green",
//               width: "20px",
//               borderRadius: "50%",
//               marginLeft: "60px",
//             }}
//           >
//             <p>'</p>
//           </div>{" "}
//           <div></div>{" "}
//           <div
//             style={{
//               backgroundColor: "violet",
//               width: "20px",
//               borderRadius: "50%",
//             }}
//           >
//             <p>'</p>
//           </div>
//         </div>
//       ) : (
//         ""
//       )
//     )
//   );
//   return (
//     <DataTable
//       columns={columns}
//       rows={rows}
//       perPageShow={6}
//       tableHeight={440}
//       className="common_table"
//     />
//   );
// };

// export default AllPeriodRecordTable;

import React from "react";
import DataTable from "../../../../../components/DataTable";
import { Checkbox } from "@mui/material";

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
  function getBackgroundColor(index) {
    switch (index % 10) {
      case 0:
        return "linear-gradient(to bottom left, #ff1100 50%, #9C28B1 0) !important";
      case 1:
        return "green";
      case 2:
        return "red";
      case 3:
        return "green";
      case 4:
        return "red";
      case 5:
        return "linear-gradient(to bottom left, #0c910c 50%, #9C28B1 0) !important";
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

  function createData(periodId, price, number) {
    return {
      periodId,
      price,
      result: (
        <div style={{ display: "flex", gap: "5px" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              style={{
                background: getBackgroundColor(i),
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
    createData(d?.periodId, d?.price, d?.number)
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



