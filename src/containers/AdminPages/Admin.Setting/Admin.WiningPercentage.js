import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  useGetWiningShareProfitQuery,
  useWiningSharePercentageMutation,
} from "../../../Services/Setting";
import { Notification } from "../../../components/ToastNotification";

const WiningPercentage = () => {
  const [
    winingSharePercentage,
    { data: winingData, isLoading: winingIsLoading, error: winingErr },
  ] = useWiningSharePercentageMutation();
  const { data, error } = useGetWiningShareProfitQuery();
  const [currPer, setCurrPer] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const myArray = Object?.entries(data?.data)?.map(([key, value]) => value);
      myArray?.splice(0, 3);
      myArray?.pop();
      setCurrPer(myArray);
    }
  }, [data]);

  const [info, setInfo] = useState({
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    level6: 0,
    level7: 0,
  });

  const handleChange = (level, value) => {
    setInfo({ ...info, ["level" + level]: value });
  };
  const [status, setStatus] = useState("");
  const [to_token_data, setTo_Token_data] = useState({
    to_token_self: 0,
    to_token_level_1: 0,
    to_token_level_2: 0,
    to_token_level_3: 0,
    to_token_level_4: 0,
    to_token_level_5: 0,
    to_token_level_6: 0,
    to_token_level_7: 0,
    to_token_level_8: 0,
    to_token_level_9: 0,
    to_token_level_10: 0,
  });
  const [total_percentage, setTotal_percentage] = useState({
    total: 100,
  });

  //   useEffect(() => {
  //     if (responseChangeIncomeDistribution?.message) {
  //       Notification(responseChangeIncomeDistribution?.message, "success");
  //       setTo_Token_data({
  //         to_token_self: 0,
  //         to_token_level_1: 0,
  //         to_token_level_2: 0,
  //         to_token_level_3: 0,
  //         to_token_level_4: 0,
  //         to_token_level_5: 0,
  //         to_token_level_6: 0,
  //         to_token_level_7: 0,
  //         to_token_level_8: 0,
  //         to_token_level_9: 0,
  //         to_token_level_10: 0,
  //       });
  //     } else {
  //       Notification(errorChangeIncomeDistribution?.data?.message, "error");
  //     }
  //   }, [responseChangeIncomeDistribution, errorChangeIncomeDistribution]);

  // total tp token percentage
  const tokenPercentage =
    total_percentage.total -
    info?.level1 -
    info?.level2 -
    info?.level3 -
    info?.level4 -
    info?.level5 -
    info?.level6 -
    info?.level7;
  const totalPercentageToken = tokenPercentage >= 0 ? tokenPercentage : 0;

  // const handleChange = (e) => {
  //   switch (e.target.name) {
  //     case "to_token_self":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_self: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_1":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_1: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_2":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_2: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;

  //     case "to_token_level_3":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_3: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_4":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_4: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_5":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_5: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_6":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_6: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_7":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_7: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_8":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_8: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_9":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_9: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     case "to_token_level_10":
  //       if (e.target.value !== "") {
  //         if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
  //           e.target.value = e.target.min;
  //         }
  //         if (parseFloat(e.target.value) > parseFloat(e.target.max)) {
  //           e.target.value = e.target.max;
  //         }
  //         setTo_Token_data((prev) => ({
  //           ...prev,
  //           to_token_level_10: parseFloat(e.target.value),
  //         }));
  //       }
  //       break;
  //     default:
  //       setTotal_percentage_data({
  //         ...total_percentage_data,
  //         to_token_total: 0,
  //       });
  //       break;
  //   }
  // };

  /* on change click handler for static and dynamic  */
  const [fieldIdentity, setFieldIdentity] = useState(1);
  //   const handleChangeIncomeType = (e) => {
  //     switch (e.target.value) {
  //       case "dynamic":
  //         setFieldIdentity(1);
  //         ChangeIncomeStatus();
  //         break;
  //       case "static":
  //         setFieldIdentity(2);
  //         ChangeIncomeStatus();
  //         break;
  //       default:
  //         setFieldIdentity(0);
  //         break;
  //     }
  //   };

  /* initial status from api handle  */
  useEffect(() => {
    setStatus(data?.data?.status ? "static" : "dynamic");
    if (data?.data?.status) {
      setFieldIdentity(2);
    }
  }, [data, setFieldIdentity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tokenPercentage !== 0) {
      Notification("Total can't be more or less than 100", "error");
    } else {
      const obj = {
        level1: parseFloat(info?.level1),
        level2: parseFloat(info?.level2),
        level3: parseFloat(info?.level3),
        level4: parseFloat(info?.level4),
        level5: parseFloat(info?.level5),
        level6: parseFloat(info?.level6),
        level7: parseFloat(info?.level7),
      };
      winingSharePercentage(obj);
    }
  };

  useEffect(() => {
    if (winingData?.message) {
      setInfo({
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0,
        level7: 0,
      });
      Notification(winingData?.message, "success");
    } else if (winingErr) {
      Notification(winingErr?.data?.message, "error");
    }
  }, [winingData, winingErr]);

  return (
    <div className="tp_income_distribution_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="tp_income_distribution_form_card"
      >
        {" "}
        <div className="tp_section_title">
          <h2>Wining Percentage</h2>
          {/* <div className="tp_section_title_right_side">
            <div className="tp_section_title_balance tp_section_Trx_balance">
              <p>{fieldIdentity === 1 ? "Dynamic" : "static"}</p>
            </div>
          </div> */}
        </div>
        <div className="tp_income_distribution_page_content">
          {/* <div className="amount_type_container">
            <div className="amount_type">
              <span className="amount_type_label">Static</span>
              <label className="switch">
                <input
                  type="radio"
                  id="static"
                  name="fav_language"
                  value="static"
                  checked={status === "static" ? true : false}
                  //   onChange={handleChangeIncomeType}
                />
                <span className="slider"></span>
              </label>{" "}
            </div>
            <div className="amount_type">
              <span className="amount_type_label">dynamic</span>
              <label className="switch">
                <input
                  type="radio"
                  id="dynamic"
                  name="fav_language"
                  value="dynamic"
                  checked={status === "dynamic" ? true : false}
                  //   onChange={handleChangeIncomeType}
                />
                <span className="slider"></span>
              </label>{" "}
            </div>
          </div> */}

          <div className="inr_token_main_container">
            <div className="inr_token_container">
              <div className="inr_token_input_container">
                <div
                  className="form_group percentage_field"
                  style={{ display: "inherit" }}
                >
                  <Input
                    label="Left Wining Percentage"
                    type="number"
                    name="to_token_total"
                    id="to_token_total"
                    placeholder=""
                    // onChange={totalPercentageToken}
                    className="input_field"
                    value={totalPercentageToken}
                    disabled={true}
                  />
                </div>
                <p>Wining Percentage</p>
                <form onSubmit={handleSubmit}>
                  {/* <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage Self "
                      type="number"
                      name="to_token_self"
                      id="self"
                      placeholder=""
                      onChange={(e) => handleChange(1, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level1}
                      isRequired={true}
                    />
                  </div> */}
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-1"
                      type="number"
                      name="to_token_level_1"
                      id="to_token_level_1"
                      placeholder=""
                      onChange={(e) => handleChange(1, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-2"
                      type="number"
                      name="to_token_level_2"
                      id="to_token_level_2"
                      placeholder=""
                      onChange={(e) => handleChange(2, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level2}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-3"
                      type="number"
                      name="to_token_level_3"
                      id="to_token_level_3"
                      placeholder=""
                      onChange={(e) => handleChange(3, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level3}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-4"
                      type="number"
                      name="to_token_level_4"
                      id="to_token_level_4"
                      placeholder=""
                      onChange={(e) => handleChange(4, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level4}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-5"
                      type="number"
                      name="to_token_level_5"
                      id="to_token_level_5"
                      placeholder=""
                      onChange={(e) => handleChange(5, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level5}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-6"
                      type="number"
                      name="to_token_level_6"
                      id="to_token_level_6"
                      placeholder=""
                      onChange={(e) => handleChange(6, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level6}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Wining Percentage UpLine Level-7"
                      type="number"
                      name="to_token_level_7"
                      id="to_token_level_7"
                      placeholder=""
                      onChange={(e) => handleChange(7, e.target.value)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      value={info?.level7}
                      isRequired={true}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="submit_btn"
                    //   disabled={
                    //     // isLoadingChangeIncomeDistribution ? true : false
                    //   }
                  >
                    {winingIsLoading ? "Loading...." : "submit"}
                  </Button>
                </form>
              </div>
            </div>
            <div className="previous_inr_token_data">
              <div className="inr_container">
                <p>Wining Percentage</p>
                <div className="inr_tp_token tp_token">
                  {currPer?.length > 0 &&
                    currPer?.map((tp, i) => (
                      <div>
                        <h3>Current {`Level ${i + 1}`} Winign Percentage</h3>
                        <p>{tp} %</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default WiningPercentage;
