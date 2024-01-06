import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  useGetGamePercentageQuery,
  useUpdateGamePercentageMutation,
} from "../../../Services/Setting";
import { Notification } from "../../../components/ToastNotification";

const GamePercentage = () => {
  const [
    updateGamePercentage,
    { data: gamePercentage, isLoading: gamePercentageIsLoading },
  ] = useUpdateGamePercentageMutation();

  const { data: getGamePercentage, isLoading: isGetGamePercentageLoading } =
    useGetGamePercentageQuery();
  // console.log({ gamePercentage });

  // console.log({ getGamePercentage });
  const [GamePercentage, setGamePercentage] = useState({});
  const handleChange = (e) => {
    setGamePercentage((prev) => {
      const newObject = { ...prev };
      newObject[e.target.name] = Number(e.target.value);
      return newObject;
    });
  };

  const handleSubmitGamePercentage = async (e) => {
    e.preventDefault();
    // console.log({ winingPercentage });
    updateGamePercentage(GamePercentage);
    // const winingPercentage = {};
    // console.log(e.target.level1);
  };

  useEffect(() => {
    if (gamePercentage?.message) {
      Notification(gamePercentage?.message, "success");
    }
  }, [gamePercentage?.message]);
  if (isGetGamePercentageLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="tp_income_distribution_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="tp_income_distribution_form_card"
      >
        <div className="tp_section_title">
          <h2>Game Percentage</h2>
        </div>
        <div className="tp_income_distribution_page_content">
          <div className="inr_token_main_container">
            <div className="inr_token_container">
              <div className="inr_token_input_container">
                <form onSubmit={handleSubmitGamePercentage}>
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
                      onChange={(e) => handleChange(e)}
                      min="0"
                      className="input_field"
                      inputGroupClass="left"
                      defaultValue={getGamePercentage?.data?.level1 || 1}
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
                    {gamePercentageIsLoading || isGetGamePercentageLoading
                      ? "Loading...."
                      : "submit"}
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

export default GamePercentage;
