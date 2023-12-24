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
  const [isDisable, setIsDisable] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);
  const { data } = useGetAllColorPrductionwHistoryQuery();
  const [selectWinner, { data: selectWindata, error }] =
    useSelectWinnerMutation();
  // console.log(data);
  let initialTimeDuration =
    180 - Math?.floor(calculateTimeDifference(periodData?.data?.updatedAt));
  console.log("nnnnnn", initialTimeDuration)
  useEffect(() => {
    if (selectWindata?.message) {
      Notification(selectWindata?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, selectWindata]);

  const statusChange = async (option) => {
    // console.log({ option });
    // const obj = {
    //   color: da?.color,
    //   number: da?.number,
    // };

    await selectWinner({ option });
    setIsDisable(true);
  };

  // for 3 minutes timer
  // const initialTime = 180; // 3 minutes in seconds
  const [seconds, setSeconds] = React.useState(null);

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

  // for keep checkbox disabled untill 2 minutes and 30 sec

  useEffect(() => {
    if (initialTimeDuration <= 30) {
      setIsDisable(false)
    }
    else  {
      setIsDisable(true)
    }
  },[initialTimeDuration,isDisable])

  useEffect(() => {
    if (periodData?.data?.period) {
      initialTimeDuration =
        180 - Math?.floor(calculateTimeDifference(periodData?.data?.updatedAt));

      if (initialTimeDuration < 0) {
        refetch();
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


