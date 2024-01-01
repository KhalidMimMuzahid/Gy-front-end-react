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
// import ColorModal from "../../.seconds./../components/ColorModal/ColorModal";
import ColorModal from "../../../../components/ColorModal/ColorModal";
import {
  useGetPeriodHistoryMutation,
  useGetPredictedOnSinglePeriodQuery,
  useGetperiodIDQuery,
} from "../../../../Services/userApi";
import { useEffect } from "react";
import { useGetAllPeriodRecordQuery } from "../../../../Services/userApi";
import AllPeriodRecordTable from "./table/AllPeriodRecordTable";
import { Notification } from "../../../../components/ToastNotification";
import calculateTimeDifference from "../../../../utils/function/fetCalculateTimeDifference";
import Modal from "../../../../components/Modal";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import PeriodHistoryTable from "./table/PeriodHistoryTable";
import GameLoader from "../../../../components/Loading/GameLoader/GameLoader";
import UserCurrentPeriodBettingHistory from "../UserCurrentPeriodBettingHistory";

const ColorGame = () => {
  const {
    data: predictedDataForCurrrentPeriod,
    refetch: refetchPredictedDataForCurrrentPeriod,
  } = useGetPredictedOnSinglePeriodQuery();

  const { data: periodData, refetch } = useGetperiodIDQuery();
  const { data: periodRecord, refetch: refetchPeriodRecord } =
    useGetAllPeriodRecordQuery();
  const [
    periodHistory,
    { data: periodHistoryData, error: periodHistoryError },
  ] = useGetPeriodHistoryMutation();

  const modalRef = React.useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  let initialTimeDuration =
    180 - Math?.floor(calculateTimeDifference(periodData?.data?.updatedAt));

  const [isLoading, setisLoading] = useState(true);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const [value, setValue] = React.useState("1");
  const [periodId, setPeriodId] = useState();
  // state for managing modal
  const [openModal, setOpenModal] = useState(false);
  //history modal
  const [openhistoryModal, setOpenhistoryModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [seconds, setSeconds] = React.useState(null);
  const [notificationShown, setNotificationShown] = useState(false);
  React.useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          setisLoading(false);
        } else if (seconds === 0) {
          refetch();
          setisLoading(true);
        } else {
          // now time is minus value
          setisLoading(true);
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [seconds]);

  //for periodId History
  // Function to fetch period history based on periodId
  // const fetchPeriodHistory = async (periodId) => {
  //   try {
  //     setPeriodId(periodId);
  //     await periodHistory({ periodId });
  //     setOpenhistoryModal(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  console.log({ periodHistoryData });
  useEffect(() => {
    if (periodData?.data?.period) {
      initialTimeDuration =
        180 - Math?.floor(calculateTimeDifference(periodData?.data?.updatedAt));

      if (initialTimeDuration < 0) {
        refetch();
        refetchPeriodRecord();
        refetchPredictedDataForCurrrentPeriod();
        setisLoading(true);
      } else {
        setSeconds(initialTimeDuration);
        setisLoading(false);
      }
    }
  }, [periodData?.data?.period]);

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

  // const [selectedColor, setSelectedColor] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  // const [number, setNumber] = useState(0);
  // state for getting number user clicked
  // const [userClicked, setUserClicked] = useState(null);
  // console.log("User clicked", userClicked);
  // function to handle opening modal

  const handleOpenModal = (option) => {
    console.log({ option });

    // selectedOption,
    setSelectedOption(option);
    setOpenModal(true);
  };
  // function to handle closing modal
  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedColor("");
  };

  return (
    <div>
      {isLoading ? (
        <GameLoader />
      ) : (
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
              <TabPanel value='1' className='tab__panel__wrapper'>
                <div className='top_content'>
                  <div className='top_content_left'>
                    <div className='title_with_icon'>
                      <GiLaurelsTrophy size={30} />
                      <p>Period</p>
                    </div>
                    <div className='amount'>
                      <h3>{periodData?.data?.period}</h3>
                    </div>
                  </div>
                  <div className='top_content_right'>
                    <div className='count-dwon-container'>
                      <p>Count Down</p>
                      <h3 style={{ color: textColor }}>
                        {formatTime(seconds)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className='game_body'>
                  <div className='color-selectors'>
                    <button
                      className='green-button'
                      id='op-1'
                      onClick={() => handleOpenModal("x1")}
                      disabled={isButtonDisabled}
                    >
                      <p>Join Green</p>
                    </button>
                    <button
                      className='violet-button'
                      id='op-2'
                      onClick={() => handleOpenModal("x2")}
                      disabled={isButtonDisabled}
                    >
                      <p>Join Violet</p>
                    </button>
                    <button
                      className='red-button'
                      id='op-3'
                      onClick={() => handleOpenModal("x3")}
                      disabled={isButtonDisabled}
                    >
                      <p>Join Red</p>
                    </button>
                  </div>
                  <div className='color_button_container'>
                    <button
                      class='red-button button0'
                      id='op-4'
                      onClick={() => handleOpenModal("x4")}
                      disabled={isButtonDisabled}
                    >
                      <p>0</p>
                    </button>
                    <button
                      class='green-button'
                      id='op-5'
                      onClick={() => handleOpenModal("x5")}
                      disabled={isButtonDisabled}
                    >
                      <p>1</p>
                    </button>
                    <button
                      class='red-button'
                      id='op-6'
                      onClick={() => handleOpenModal("x6")}
                      disabled={isButtonDisabled}
                    >
                      <p>2</p>
                    </button>
                    <button
                      class='green-button'
                      id='op-7'
                      onClick={() => handleOpenModal("x7")}
                      disabled={isButtonDisabled}
                    >
                      <p>3</p>
                    </button>
                    <button
                      class='red-button'
                      id='op-8'
                      onClick={() => handleOpenModal("x8")}
                      disabled={isButtonDisabled}
                    >
                      <p>4</p>
                    </button>
                  </div>
                  <div className='color_button_container'>
                    <button
                      class='red-button button6'
                      id='op-9'
                      onClick={() => handleOpenModal("x9")}
                      disabled={isButtonDisabled}
                    >
                      <p>5</p>
                    </button>

                    <button
                      class='red-button'
                      id='op-10'
                      onClick={() => handleOpenModal("x10")}
                      disabled={isButtonDisabled}
                    >
                      <p>6</p>
                    </button>
                    <button
                      class='green-button'
                      id='op-11'
                      onClick={() => handleOpenModal("x11")}
                      disabled={isButtonDisabled}
                    >
                      <p>7</p>
                    </button>
                    <button
                      class='red-button'
                      id='op-12'
                      onClick={() => handleOpenModal("x12")}
                      disabled={isButtonDisabled}
                    >
                      <p>8</p>
                    </button>
                    <button
                      class='green-button'
                      id='op-13'
                      onClick={() => handleOpenModal("x13")}
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
                    <AllPeriodRecordTable
                      data={periodRecord?.data}
                      // perioHistory={fetchPeriodHistory}
                    />
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
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            refetchPredictedDataForCurrrentPeriod={
              refetchPredictedDataForCurrrentPeriod
            }
          />
          {/* // for PeriodId History */}
          {/* <Modal
            openModal={openhistoryModal}
            setOpenModal={setOpenhistoryModal}
            modalTitle={`PeriodId ${periodId}`}
            modalRef={modalRef}
          >
            <div className="ss-trade_commol_modal_field">
              <div className="transaction_details">
                <PeriodHistoryTable data={periodHistoryData?.data} />
              </div>
            </div>
          </Modal> */}
        </div>
      )}
      <UserCurrentPeriodBettingHistory
        predictedDataForCurrrentPeriod={predictedDataForCurrrentPeriod}
      />
    </div>
  );
};

export default ColorGame;
