import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  useGetRoiPercentageQuery,
  useUpdateRoiPercentageMutation,
} from "../../../Services/Setting";
import { Notification } from "../../../components/ToastNotification";

const RoiPercentage = () => {
  const [updateRoiPercentage, { data: roiPercentage, isLoading }] =
    useUpdateRoiPercentageMutation();

  const { data: getRoiPercentage, isLoading: getRoiPercentageLoading } =
    useGetRoiPercentageQuery();

  const [roiPercent, setRoiPercent] = useState({
    roiPercentage: 0,
  });
  const handleChange = (e) => {
    setRoiPercent({
      ...roiPercent,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setRoiPercent({
      ...roiPercentage,
      roiPercentage: getRoiPercentage?.data?.roiPercentage,
    });
  }, [getRoiPercentage]);
  console.log("roiPercent", getRoiPercentage?.data?.roiPercentage);

  const handleSubmitRoiPercentage = async (e) => {
    e.preventDefault();
    await updateRoiPercentage(roiPercent);
  };

  useEffect(() => {
    if (roiPercentage?.message) {
      Notification(roiPercentage?.message, "success");
    }
  }, [roiPercentage]);
  if (getRoiPercentageLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="tp_income_distribution_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="tp_income_distribution_form_card"
      >
        <div className="tp_section_title">
          <h2>ROI Percentage</h2>
        </div>
        <div className="tp_income_distribution_page_content">
          <div className="inr_token_main_container">
            <div className="inr_token_container">
              <div className="inr_token_input_container">
                <form onSubmit={handleSubmitRoiPercentage}>
                  <div
                    className="form_group percentage_field"
                    style={{ display: "inherit" }}
                  >
                    <Input
                      label="ROI Percentage"
                      type="text"
                      name="roiPercentage"
                      placeholder="Enter ROI percentage"
                      onChange={handleChange}
                      value={roiPercent?.roiPercentage}
                      className="input_field"
                      inputGroupClass="left"
                      isRequired={true}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="submit_btn"
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? "Loading" : "submit"}
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

export default RoiPercentage;
