import * as React from "react";

import {
  useGetAllColorPrductionwHistoryQuery,
  useSelectWinnerMutation,
} from "../../../../Services/withdrawApi";
import AllColorPredictionTable from "./table/AllColorPredictionTable";
import { Notification } from "../../../../components/ToastNotification";
import { useEffect } from "react";
import { useGetperiodIDQuery } from "../../../../Services/userApi";
import calculateTimeDifference from "../../../../utils/function/fetCalculateTimeDifference";

const AdminGameDashBoard = () => {
  const { data: periodData, refetch } = useGetperiodIDQuery();
  const [isDisable, setIsDisable] = React.useState(true);
  const [isWinnerSelected, setIsWinnerSelected] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);
  const { data } = useGetAllColorPrductionwHistoryQuery();
  const [selectWinner, { data: selectWindata, error }] =
    useSelectWinnerMutation();
  // console.log(data);
  let initialTimeDuration =
    180 - Math?.floor(calculateTimeDifference(periodData?.data?.updatedAt));
  // console.log("nnnnnn", initialTimeDuration)
  useEffect(() => {
    if (selectWindata?.option) {
      Notification(
        `You have selected ${selectWindata?.option} for period ${periodData?.data?.period}`,
        "success"
      );
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, selectWindata]);

  const statusChange = async (option) => {
    await selectWinner({ option });

    setIsDisable(true);
    setIsWinnerSelected(option);
  };

  // for 3 minutes timer
  // const initialTime = 180; // 3 minutes in seconds
  const [seconds, setSeconds] = React.useState(null);

  React.useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          // setSeconds(seconds - 1);
          setisLoading(false);
          if (seconds > 30) {
            setIsDisable(true);
          } else if (seconds <= 30 && isWinnerSelected) {
            setIsDisable(true);
          } else if (seconds <= 30 && !isWinnerSelected) {
            setIsDisable(false);
          }
        } else if (seconds === 0) {
          refetch();
          setisLoading(true);
          setIsDisable(true);
          setIsWinnerSelected(false);
        } else {
          // now time is minus value
          setisLoading(true);
        }
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [seconds]);

  // // for keep checkbox disabled untill 2 minutes and 30 sec

  // useEffect(() => {
  //   if (initialTimeDuration <= 30) {
  //     setIsDisable(false);
  //   } else {
  //     setIsDisable(true);
  //   }
  // }, [initialTimeDuration]);

  useEffect(() => {
    if (periodData?.data?.period) {
      initialTimeDuration =
        180 - Math?.floor(calculateTimeDifference(periodData?.data?.updatedAt));

      if (initialTimeDuration <= 0) {
        refetch();
        setisLoading(true);
      } else {
        setSeconds(initialTimeDuration);
        setIsWinnerSelected(periodData?.isWinnerSelected);
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
  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="game_dashboard_wrapper">
          <div className="game_dashboard_header">
            <div className="game_dashboard_header_left">
              <h4>Count Down</h4>
              <h5 style={{ color: textColor }}>{formatTime(seconds)}</h5>
            </div>
            <div className="game_dashboard_header_right">
              <h4>Active Period Id</h4>
              <p>{periodData?.data?.period}</p>
            </div>
          </div>
          <div className="game_dashboard_table">
            <AllColorPredictionTable
              isWinnerSelected={isWinnerSelected}
              data={data?.data}
              statusChange={statusChange}
              isDisable={isDisable}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGameDashBoard;
