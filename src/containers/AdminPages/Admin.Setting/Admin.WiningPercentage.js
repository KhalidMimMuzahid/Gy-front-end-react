import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  useGetWinningPercentageQuery,
  useUpdateWinningPercentageMutation,
} from "../../../Services/Setting";
import { Notification } from "../../../components/ToastNotification";

const WiningPercentage = () => {
  const [
    updateWinningPercentage,
    { data: winningPercentage, error, isLoading },
  ] = useUpdateWinningPercentageMutation();

  const {
    data: winningPercentage2,
    error: error2,
    isLoading: isLoading2,
  } = useGetWinningPercentageQuery();
  console.log({ winningPercentage2 });

  console.log({ winningPercentage });
  const [winingPercentage, setWiningPercentage] = useState({});
  const handleChange = (e) => {
    setWiningPercentage((prev) => {
      const newObject = { ...prev };
      newObject[e.target.name] = Number(e.target.value);
      return newObject;
    });
  };

  const handleSubmitWiningPercentage = async (e) => {
    e.preventDefault();
    // console.log({ winingPercentage });
    updateWinningPercentage(winingPercentage);
    // const winingPercentage = {};
    // console.log(e.target.level1);
  };

  useEffect(() => {
    if (winningPercentage?.message) {
      Notification(winningPercentage?.message, "success");
    }
  }, [winningPercentage?.message]);
  if (isLoading2) {
    return <h1>loading...</h1>;
  }
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
                <p>TP Token</p>
                <form onSubmit={handleSubmitWiningPercentage}>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-1"
                      type="text"
                      name="level1"
                      id="self"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level1 || 1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="level-2"
                      type="text"
                      name="level2"
                      id="to_token_level_1"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level2 || 1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-3"
                      type="text"
                      name="level3"
                      id="to_token_level_2"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level3 || 1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-4"
                      type="text"
                      name="level4"
                      id="to_token_level_3"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level4 || 1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-5"
                      type="text"
                      name="level5"
                      id="to_token_level_4"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level5 || 1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-6"
                      type="text"
                      name="level6"
                      id="to_token_level_5"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level6 || 1}
                      isRequired={true}
                    />
                  </div>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-7"
                      type="text"
                      name="level7"
                      id="to_token_level_6"
                      placeholder=""
                      onChange={handleChange}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={winningPercentage2?.data?.level7 || 1}
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
                    {/* {isLoadingChangeIncomeDistribution ? "Loading" : "submit"} */}
                    Submit
                  </Button>
                </form>
              </div>
            </div>
            <div className="previous_inr_token_data">
              {/* <div className="inr_container">
                <p>Wining Percentage</p>
                <div className="inr_tp_token tp_token">
                  {data?.data?.token_level_dist?.length > 0 &&
                    data?.data?.token_level_dist?.map((tp, i) => (
                      <div>
                        <h3>
                          Current {i === 0 ? "Self" : `Level ${i}`} Winning
                          Percentage
                        </h3>
                        <p>{tp} %</p>
                      </div>
                    ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default WiningPercentage;
