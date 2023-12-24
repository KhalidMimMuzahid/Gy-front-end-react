import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonInputGroup from "../ButtonInputGroup/ButtonInputGroup";
import CustomLink from "../Link";
import { useBettingDataMutation } from "../../Services/userApi";
import { Notification } from "../ToastNotification";
import { getOptionTitle } from "../../utils/function/getOptionTitle";

const ColorModal = ({
  open,
  handleClose,
  isButtonDisabled,
  currentPeriod,
  selectedOption,
  setSelectedOption,
}) => {
  const [
    createBetting,
    { data: bettingData, error: bettingError, isLoading: bettingLoading },
  ] = useBettingDataMutation();
  // console.log("Betting data:", bettingData);
  // console.log("Betting loading:", bettingLoading);
  // console.log("Betting err:", bettingError);
  const [selectedValue, setSelectedValue] = useState([10, 100, 1000, 10000]);
  // for getting current value of button group
  const [currVal, setcurVal] = useState(10);
  //for counter
  const [count, setCount] = useState(1);

  // For Toatal contract money
  const totalContractMony = parseInt(currVal * count);

  // console.log("Total Contract Money is:", totalContractMony);
  // console.log("Contract Count:", count);
  // console.log("Current Period:", currentPeriod);
  // console.log("User Selected Color:", selectedColor);
  // console.log("User clicked Number:", userClickedNumber);
  // console.log("Contract Amount :", currVal);
  // for create betting
  const betCreator = {
    // color: selectedColor,
    // number: userClickedNumber || number,
    // box: isFromBox || userClickedNumber,
    option: selectedOption,
    period: currentPeriod,
    totalContractMoney: totalContractMony,
  };

  const handleConfirm = async () => {
    if (bettingError?.data?.message) {
      return Notification(bettingError?.data?.message, "error");
    }

    if (bettingLoading) {
      return <>Loading...</>; // It's not clear what you want to return here
    }

    try {
      const response = await createBetting(betCreator);
      // console.log({ response });
      if (response?.data?.message) {
        Notification(response?.data?.message, "success");
      }
    } catch (error) {
      // Handle error in case of an issue with the API call
      // console.error("Error creating betting:", error);
      Notification("Something Went wrong!", "error");
    }
    // for reseting state
    // setSelectedColor("");
    // setUserClicked(null);
    // setisFromBox(null);
    // setNumber(null);

    setSelectedOption(null);
    handleClose();
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    borderRadius: "8px",
    outline: "none",
    width: "400px",
    maxWidth: "80%",
  };
  //function for counter
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <h2 id="modal-modal-title" >{`Join ${getOptionTitle(
          selectedOption
        )}`}</h2>
        <div className="modal_body">
          <p>Contract Money</p>
          <ButtonInputGroup
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            setcurVal={setcurVal}
          />
          {/* counter of contract here */}
          <div className="counter-container">
            <label className="counter-label">Contract count</label>
            <div className="counter">
              <button onClick={decrement} className="counter-button">
                -
              </button>
              <span className="count">{count}</span>
              <button onClick={increment} className="counter-button">
                +
              </button>
            </div>
          </div>
          {/* Calculate total Amount */}
          <div className="total_amount_to_deduct">
            <p>Total Contract Money is : {totalContractMony}</p>
          </div>
          <div className="accept_condition">
            <FormGroup>
              <div className="terms_and_condition">
                <FormControlLabel control={<Checkbox checked />} />
                <p>
                  I agreed to{" "}
                  <CustomLink href="https://www.facebook.com/">
                    PRE SALE RULE
                  </CustomLink>
                </p>
              </div>
            </FormGroup>
          </div>
          {/* Add confirm and cancel buttons */}
          <div className="button-container">
            <button onClick={handleClose} className="cancel-button">
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="confirm-button"
              disabled={isButtonDisabled}
            >
              Confirm
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ColorModal;
