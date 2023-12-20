const calculateTimeDifference = (lastPeriodIST) => {
  const newDate = new Date();
  const currentIST = newDate.toUTCString();
  const date1 = new Date(lastPeriodIST);
  const date2 = new Date(currentIST);
  // console.log("Date one: ", date1, "Date 2: ", date2);
  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(date2 - date1);

  // Convert milliseconds to seconds
  const timeDifferenceInSeconds = timeDifference / 1000;
  // console.log({ timeDifferenceInSeconds });
  return timeDifferenceInSeconds;
};
export default calculateTimeDifference;
