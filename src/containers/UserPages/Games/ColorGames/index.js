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
import { useState } from "react";
import ColorModal from "../../../../components/ColorModal/ColorModal";
import { useGetperiodIDQuery } from "../../../../Services/userApi";
import { useEffect } from "react";
import { useGetAllPeriodRecordQuery } from "../../../../Services/userApi";
import AllPeriodRecordTable from "./table/AllPeriodRecordTable";
const ColorGame = () => {
  const { data: periodData } = useGetperiodIDQuery();
  const { data: periodRecord } = useGetAllPeriodRecordQuery();
  // console.log({ periodRecord });
  // console.log("Current period", periodData?.data[0]?.period);
  // detect if from non number box
  const [isFromBox, setisFromBox] = useState(null);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  // for period id
  const [periodID, setperiodID] = React.useState("");
  // For Tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  useEffect(() => {
    const remainingTime = 180 - seconds;
    if (remainingTime <= 150) {
      setisButtonDisabled(false);
    } else {
      setisButtonDisabled(true);
    }
  }, [seconds, isButtonDisabled]);
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
      setisFromBox(null);
    }
    if (selectedColor === "red") {
      setNumber(2);
      setisFromBox(null);
    }
    if (selectedColor === "violet") {
      setNumber(0);
      setisFromBox(null);
    }
  }, [number, selectedColor]);

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
                  id='oub-green'
                  onClick={() => handleOpenModal("green")}
                  disabled={isButtonDisabled}
                >
                  <p>Join Green</p>
                </button>
                <button
                  className='violet-button'
                  id='oub-violate'
                  onClick={() => handleOpenModal("violet")}
                  disabled={isButtonDisabled}
                >
                  <p>Join Violet</p>
                </button>
                <button
                  className='red-button'
                  id='oub-red'
                  onClick={() => handleOpenModal("red")}
                  disabled={isButtonDisabled}
                >
                  <p>Join Red</p>
                </button>
              </div>
              <div className='color_button_container'>
                <button
                  class='red-button button0'
                  onClick={() => handleOpenModal("red-violet(0)")}
                  disabled={isButtonDisabled}
                >
                  <p>0</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("green(1)")}
                  disabled={isButtonDisabled}
                >
                  <p>1</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("red(2)")}
                  disabled={isButtonDisabled}
                >
                  <p>2</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("green(3)")}
                  disabled={isButtonDisabled}
                >
                  <p>3</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("red(4)")}
                  disabled={isButtonDisabled}
                >
                  <p>4</p>
                </button>
              </div>
              <div className='color_button_container'>
                <button
                  class='red-button button6'
                  onClick={() => handleOpenModal("green-violet(5)")}
                  disabled={isButtonDisabled}
                >
                  <p>5</p>
                </button>

                <button
                  class='red-button'
                  onClick={() => handleOpenModal("red(6)")}
                  disabled={isButtonDisabled}
                >
                  <p>6</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("green(7)")}
                  disabled={isButtonDisabled}
                >
                  <p>7</p>
                </button>
                <button
                  class='red-button'
                  onClick={() => handleOpenModal("red(8)")}
                  disabled={isButtonDisabled}
                >
                  <p>8</p>
                </button>
                <button
                  class='green-button'
                  onClick={() => handleOpenModal("green(9)")}
                  disabled={isButtonDisabled}
                >
                  <p>9</p>
                </button>
              </div>
            </div>
            <div className='records_table'>
              <div className='table_header'>
                <IoMdTrophy size={50} />
                <p>Parity Record</p>
              </div>
              <div className='table-content'>
                <AllPeriodRecordTable data={periodRecord?.data} />
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
        isButtonDisabled={isButtonDisabled}
        currentPeriod={periodData?.data[0]?.period}
        selectedColor={selectedColor}
        userClickedNumber={userClicked}
        isFromBox={isFromBox}
        number={number}
      />
    </div>
  );
};

export default ColorGame;
