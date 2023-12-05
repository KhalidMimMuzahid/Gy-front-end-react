import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useGetAllColorPrductionwHistoryQuery } from "../../../../Services/withdrawApi";

const AdminGameDashBoard = () => {
  const { data } = useGetAllColorPrductionwHistoryQuery();
  console.log(data);
  // for table
  function createData(color, number, numberOfUser, amount) {
    return { color, number, numberOfUser, amount };
  }

  const rows = [
    data?.length > 0 &&
      data?.map((d) =>
        createData(d?.color, d?.number, d?.numberOfUser, d?.amount)
      ),
  ];
  // for 3 minutes timer
  const initialTime = 180; // 3 minutes in seconds
  const [seconds, setSeconds] = React.useState(initialTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setSeconds(initialTime); // Reset the timer to initial value
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    const formattedTime = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return formattedTime;
  };
  const textColor = seconds <= 30 ? "red" : "";
  return (
    <div className="game_dashboard_wrapper">
      <div className="game_dashboard_header">
        <div className="game_dashboard_header_left">
          <h4>Count Dwon</h4>
          <h5 style={{ color: textColor }}>{formatTime(seconds)}</h5>
        </div>
        <div className="game_dashboard_header_right">
          <h4>Active Period Id</h4>
          <p>0000000000</p>
        </div>
      </div>
      <div className="game_dashboard_table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <p>Result</p>
                </TableCell>
                <TableCell align="right">
                  <p>Numbers</p>
                </TableCell>
                <TableCell align="right">
                  <p>No. of Users</p>
                </TableCell>
                <TableCell align="right">
                  <p>Amount</p>
                </TableCell>
                <TableCell align="right">
                  <p>Action</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">
                    <Checkbox color="primary" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminGameDashBoard;
