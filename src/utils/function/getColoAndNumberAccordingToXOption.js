export const getColoAndNumberAccordingToXOption = (option) => {
  let color = null;
  let number = null;
  if (option === "x1") {
    color = "Green";
  } else if (option === "x2") {
    color = "Violet";
  } else if (option === "x3") {
    color = "Red";
  } else if (option === "x4") {
    number = 0;
  } else if (option === "x5") {
    number = 1;
  } else if (option === "x6") {
    number = 2;
  } else if (option === "x7") {
    number = 3;
  } else if (option === "x8") {
    number = 4;
  } else if (option === "x9") {
    number = 5;
  } else if (option === "x10") {
    number = 6;
  } else if (option === "x11") {
    number = 7;
  } else if (option === "x12") {
    number = 8;
  } else {
    // this is default for option "x13"
    // ..
    number = 9;
  }

  return { color, number };
};
