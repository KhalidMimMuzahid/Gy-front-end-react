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
import {
  useGetInitialTimeQuery,
  useGetperiodIDQuery,
} from "../../../../Services/userApi";
import { useEffect } from "react";
import { useGetAllPeriodRecordQuery } from "../../../../Services/userApi";
import AllPeriodRecordTable from "./table/AllPeriodRecordTable";
import { Notification } from "../../../../components/ToastNotification";
const ColorGame = () => {
  const { data: periodData, refetch } = useGetperiodIDQuery();

  const {
    data: initialTime,
    refetch: refetchForInitialTime,
    isLoading: InitialTimeisLoading,
  } = useGetInitialTimeQuery();
  // console.log("Initial Time :", initialTime);
  const { data: periodRecord } = useGetAllPeriodRecordQuery();

  // console.log("Current period", periodData?.data?.period);
  // detect if from non number box
  const [isFromBox, setisFromBox] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  //getting current period creation time
  // const [createdDate, setCreatedDate] = useState(null);
  // console.log("period created at:", createdDate);
  // setCreatedDate(periodData?.data[0]?.createdAt);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  // for period id
  // const [periodID, setperiodID] = React.useState(periodData?.data?.period);
  // For Tabs
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for 3 minutes timer
  // const initialTime = 180; // 3 minutes in seconds
  const [seconds, setSeconds] = React.useState(null);
  const [notificationShown, setNotificationShown] = useState(false);
  React.useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setSeconds(initialTime?.data); // Reset the timer to initial value
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [seconds, isLoading]);
  // for setting period automatically after 3 minutes
  useEffect(() => {
    if (
      // seconds !== (null || undefined) &&
      // seconds === 0 &&
      periodData?.data?.period ||
      !seconds
    ) {
      refetch();
      refetchForInitialTime();
      setisLoading(true);
      // setperiodID(periodData.data[0].period);
    }
    if (initialTime?.data && periodData?.data?.period) {
      setisLoading(false);
    }
  }, [seconds, periodData?.data?.period, initialTime?.data]);

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
      if (!notificationShown && !isLoading) {
        Notification("Times up!", "error");
        // Set the state to indicate that the notification has been shown
        setNotificationShown(true);
      }
    }
  }, [seconds, isButtonDisabled, notificationShown]);
  // state for managing modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  const [number, setNumber] = useState(0);
  // state for getting number user clicked
  const [userClicked, setUserClicked] = useState(null);
  // console.log("User clicked", userClicked);
  // function to handle opening modal
  const handleOpenModalX = (color) => {
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
  const handleOpenModal = (option) => {
    console.log({ option });

    // selectedOption,
    setSelectedOption(option);
    setOpenModal(true);
  };
  // function to handle closing modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedColor("");
  };
  // for setting period
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     if (seconds && periodData?.data?.period) {
  //       try {
  //         if (seconds && periodData?.data?.period) {
  //           setperiodID(periodData.data[0].period);
  //         } else if (seconds === 0) {
  //           console.log("Fetching...");
  //         }
  //       } catch (error) {
  //         // Handle error if refetch fails
  //         console.error("Error fetching data:", error);
  //       }
  //     } else {
  //     }
  //   };

  //   fetchData();

  //   // Add cleanup function if necessary
  //   // For example, if refetch returns a cleanup function
  //   // return () => {
  //   //   // Perform cleanup here if needed
  //   // };
  // }, [periodData?.data?.period, periodID, setperiodID, refetch]);

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
  // isLoading && return <h1>Loading..</h1>;
  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="color_games_container">
          {/* For Tabs */}
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  centered
                >
                  <Tab label="Parity" value="1" />
                  {/* <Tab label='Item Two' value='2' />
              <Tab label='Item Three' value='3' /> */}
                  {/* More can be addded here */}
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="top_content">
                  <div className="top_content_left">
                    <div className="title_with_icon">
                      <GiLaurelsTrophy size={30} />
                      <p>Period</p>
                    </div>
                    <div className="amount">
                      <h3>{periodData?.data?.period}</h3>
                    </div>
                  </div>
                  <div className="top_content_right">
                    <div className="count-dwon-container">
                      <p>Count Dwon</p>
                      <h3 style={{ color: textColor }}>
                        {formatTime(seconds)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="game_body">
                  <div className="color-selectors">
                    <button
                      className="green-button"
                      id="op-1"
                      onClick={() => handleOpenModal("x1")}
                      disabled={isButtonDisabled}
                    >
                      <p>Join Green</p>
                    </button>
                    <button
                      className="violet-button"
                      id="op-2"
                      onClick={() => handleOpenModal("x2")}
                      disabled={isButtonDisabled}
                    >
                      <p>Join Violet</p>
                    </button>
                    <button
                      className="red-button"
                      id="op-3"
                      onClick={() => handleOpenModal("x3")}
                      disabled={isButtonDisabled}
                    >
                      <p>Join Red</p>
                    </button>
                  </div>
                  <div className="color_button_container">
                    <button
                      class="red-button button0"
                      id="op-4"
                      onClick={() => handleOpenModal("x4")}
                      disabled={isButtonDisabled}
                    >
                      <p>0</p>
                    </button>
                    <button
                      class="green-button"
                      id="op-5"
                      onClick={() => handleOpenModal("x5")}
                      disabled={isButtonDisabled}
                    >
                      <p>1</p>
                    </button>
                    <button
                      class="red-button"
                      id="op-6"
                      onClick={() => handleOpenModal("x6")}
                      disabled={isButtonDisabled}
                    >
                      <p>2</p>
                    </button>
                    <button
                      class="green-button"
                      id="op-7"
                      onClick={() => handleOpenModal("x7")}
                      disabled={isButtonDisabled}
                    >
                      <p>3</p>
                    </button>
                    <button
                      class="red-button"
                      id="op-8"
                      onClick={() => handleOpenModal("x8")}
                      disabled={isButtonDisabled}
                    >
                      <p>4</p>
                    </button>
                  </div>
                  <div className="color_button_container">
                    <button
                      class="red-button button6"
                      id="op-9"
                      onClick={() => handleOpenModal("x9")}
                      disabled={isButtonDisabled}
                    >
                      <p>5</p>
                    </button>

                    <button
                      class="red-button"
                      id="op-10"
                      onClick={() => handleOpenModal("x10")}
                      disabled={isButtonDisabled}
                    >
                      <p>6</p>
                    </button>
                    <button
                      class="green-button"
                      id="op-11"
                      onClick={() => handleOpenModal("x11")}
                      disabled={isButtonDisabled}
                    >
                      <p>7</p>
                    </button>
                    <button
                      class="red-button"
                      id="op-12"
                      onClick={() => handleOpenModal("x12")}
                      disabled={isButtonDisabled}
                    >
                      <p>8</p>
                    </button>
                    <button
                      class="green-button"
                      id="op-13"
                      onClick={() => handleOpenModal("x13")}
                      disabled={isButtonDisabled}
                    >
                      <p>9</p>
                    </button>
                  </div>
                </div>
                <div className="records_table">
                  <div className="table_header">
                    <IoMdTrophy size={50} />
                    <p>Parity Record</p>
                  </div>
                  <div className="table-content">
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
            currentPeriod={periodData?.data?.period}
            // selectedColor={selectedColor}
            // setSelectedColor={setSelectedColor}
            // userClickedNumber={userClicked}
            // setUserClicked={setUserClicked}
            // setisFromBox={setisFromBox}
            // setNumber={setNumber}
            // isFromBox={isFromBox}
            // number={number}

            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      )}
    </div>
  );
};

export default ColorGame;
