import * as React from "react";
// for tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// for icons
import { GiLaurelsTrophy } from "react-icons/gi";
import { IoMdTrophy } from "react-icons/io";
// for tables
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import ColorModal from "../../../../components/ColorModal/ColorModal";
import {
  useBettingDataMutation,
  useGetperiodIDQuery,
} from "../../../../Services/userApi";
import { useEffect } from "react";

const ColorGame = () => {
  const { data: periodData } = useGetperiodIDQuery();
  const [
    createBetting,
    { data: bettingData, error: bettingError, isLoading: bettingLoading },
  ] = useBettingDataMutation();
  console.log("Betting data", bettingData);
  console.log("Betting loading", bettingLoading);
  console.log("Betting err", bettingError);
  // for period id
  const [periodID, setperiodID] = React.useState("");
  // For Tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // for tables
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
    createData("Gingerbread", 356, 16.0, 49),
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

  // state for managing modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [number, setNumber] = useState(0);
  // state for getting number user clicked
  const [userClicked, setUserClicked] = useState(null);
  // console.log("User clicked", userClicked);
  // function to handle opening modal
  const handleOpenModal = (color) => {
    // Check if the color contains a number in parentheses
    const numberRegex = /\((\d+)\)/;
    const match = color.match(numberRegex);
    // Remove parentheses and their content from the color string
    const cleanedColor = color.replace(/\(\d+\)/, "");
    if (match && match[1]) {
      const number = parseInt(match[1]);
      if (number >= 0 && number <= 10) {
        setSelectedColor(cleanedColor);
        setOpenModal(true);
        // Do something with the number if needed
        // console.log(`Button ${number} clicked`);
        setUserClicked(number);
      } else {
        console.log("Button out of range (0-10)");
      }
    } else {
      // Handle other buttons without numbers in parentheses
      setSelectedColor(color);
      setOpenModal(true);
    }
  };

  // function to handle closing modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedColor("");
  };
  // for setting period
  React.useEffect(() => {
    if (periodData?.data[0]?.period) {
      setperiodID(periodData?.data[0]?.period);
    }
  }, [periodData?.data[0]?.period, periodID, setperiodID]);
  // for non-number color button
  useEffect(() => {
    if (selectedColor === "green") {
      setNumber(1);
    }
    if (selectedColor === "red") {
      setNumber(2);
    }
    if (selectedColor === "violet") {
      setNumber(0);
    }
  }, [number]);
  return (
    <div className='color_games_container'>
      {/* For Tabs */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
              centered
            >
              <Tab label='Parity' value='1' />
              {/* <Tab label='Item Two' value='2' />
              <Tab label='Item Three' value='3' /> */}
              {/* More can be addded here */}
            </TabList>
          </Box>
          <TabPanel value='1'>
            <div className='top_content'>
              <div className='top_content_left'>
                <div className='title_with_icon'>
                  <GiLaurelsTrophy size={30} />
                  <p>Period</p>
                </div>
                <div className='amount'>
                  <h3>{periodID}</h3>
                </div>
              </div>
              <div className='top_content_right'>
                <div className='count-dwon-container'>
                  <p>Count Dwon</p>
                  <h3 style={{ color: textColor }}>{formatTime(seconds)}</h3>
                </div>
              </div>
            </div>
            <div className='game_body'>
              <div className='color-selectors'>
                <button
                  className='green-button'
                  onClick={() => handleOpenModal("green")}
                >
                  <p>Join Green</p>
                </button>
                <button
                  className='violet-button'
                  onClick={() => handleOpenModal("violet")}
                >
                  <p>Join Violet</p>
                </button>
                <button
                  className='red-button'
                  onClick={() => handleOpenModal("red")}
                >
                  <p>Join Red</p>
                </button>
              </div>
              <div className='color_button_container'>
                <button
                  class='red-button button0'
                  onClick={() => handleOpenModal("red-violet(0)")}
                >
                  <p>0</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("green(1)")}
                >
                  <p>1</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("red(2)")}
                >
                  <p>2</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("green(3)")}
                >
                  <p>3</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("red(4)")}
                >
                  <p>4</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("green-violet(5)")}
                >
                  <p>5</p>
                </button>

                <button
                  class='red-button button6'
                  onClick={() => handleOpenModal("red(6)")}
                >
                  <p>6</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("green(7)")}
                >
                  <p>7</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("red(8)")}
                >
                  <p>8</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("green(9)")}
                >
                  <p>9</p>
                </button>
              </div>
              <div className='color_button_container'></div>
            </div>
            <div className='records_table'>
              <div className='table_header'>
                <IoMdTrophy size={50} />
                <p>Parity Record</p>
              </div>
              <div className='table-content'>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <p>Period</p>
                        </TableCell>
                        <TableCell align='right'>
                          <p>Price</p>
                        </TableCell>
                        <TableCell align='right'>
                          <p>Number</p>
                        </TableCell>
                        <TableCell align='right'>
                          <p>Result</p>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {row.name}
                          </TableCell>
                          <TableCell align='right'>{row.calories}</TableCell>
                          <TableCell align='right'>{row.fat}</TableCell>
                          <TableCell align='right'>{row.carbs}</TableCell>
                          <TableCell align='right'>{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </TabPanel>
          {/* More can be added Here */}
          {/* <TabPanel value='2'>Item Two</TabPanel>
          <TabPanel value='3'>Item Three</TabPanel> */}
        </TabContext>
      </Box>
      <ColorModal
        open={openModal}
        handleClose={handleCloseModal}
        color={selectedColor}
        userClicked={userClicked}
        setUserClicked={setUserClicked}
        periodID={periodID}
        createBetting={createBetting}
        bettingData={bettingData}
        bettingError={bettingError}
        number={number}
      />
    </div>
  );
};

export default ColorGame;
