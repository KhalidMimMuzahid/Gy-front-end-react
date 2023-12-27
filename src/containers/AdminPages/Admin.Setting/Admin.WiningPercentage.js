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
    { data: winningPercentage, isLoading: winingIsLoading },
  ] = useUpdateWinningPercentageMutation();

  const { data: winningPercentage2, isLoading: isLoading2 } =
    useGetWinningPercentageQuery();
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
        </div>
        <div className="tp_income_distribution_page_content">
          <div className="inr_token_main_container">
            <div className="inr_token_container">
              <div className="inr_token_input_container">
                <form onSubmit={handleSubmitWiningPercentage}>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="Level-1"
                      type="number"
                      name="level1"
                      id="self"
                      placeholder=""
                      onChange={(e) => handleChange(1, e.target.value)}
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
                      type="number"
                      name="level2"
                      id="to_token_level_1"
                      placeholder=""
                      onChange={(e) => handleChange(1, e.target.value)}
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
                      type="number"
                      name="level3"
                      id="to_token_level_2"
                      placeholder=""
                      onChange={(e) => handleChange(2, e.target.value)}
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
                      type="number"
                      name="level4"
                      id="to_token_level_3"
                      placeholder=""
                      onChange={(e) => handleChange(3, e.target.value)}
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
                      type="number"
                      name="level5"
                      id="to_token_level_4"
                      placeholder=""
                      onChange={(e) => handleChange(4, e.target.value)}
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
                      type="number"
                      name="level6"
                      id="to_token_level_5"
                      placeholder=""
                      onChange={(e) => handleChange(5, e.target.value)}
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
                      type="number"
                      name="level7"
                      id="to_token_level_6"
                      placeholder=""
                      onChange={(e) => handleChange(6, e.target.value)}
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
                    {winingIsLoading ? "Loading...." : "submit"}
                  </Button>
                </form>
              </div>
            </div>
            <div className="previous_inr_token_data"></div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default WiningPercentage;
