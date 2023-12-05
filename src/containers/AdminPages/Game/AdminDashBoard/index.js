import * as React from "react";

import { useGetAllColorPrductionwHistoryQuery } from "../../../../Services/withdrawApi";
import AllColorPredictionTable from "./table/AllColorPredictionTable";
import { Notification } from "../../../../components/ToastNotification";

const AdminGameDashBoard = () => {
  const { data } = useGetAllColorPrductionwHistoryQuery();
  const [selectWinner, {data:selectWindata, error}]= useSelectWinnerMutation();
  
  console.log(data);


  useEffect(() => {
    if (selectWindata?.message) {
      Notification(selectWindata?.message, "success");
    } else {
      Notification(statusError?.data?.message, "error");
    }
  }, [error, selectWindata]);
  const statusChange = async(da) => {
    const obj={
      color:da?.color,
      number:da?.number
    }
    await selectWinner(obj)
    console.log("data may of ", da);
  };
  function createData(color, number, numberOfUser, amount) {
    return { color, number, numberOfUser, amount };
  }

 
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
        <AllColorPredictionTable
          data={data?.data}
          statusChange={statusChange}
        />
       
      </div>
    </div>
  );
};

export default AdminGameDashBoard;
