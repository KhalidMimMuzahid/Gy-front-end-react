import React, { useEffect, useState } from "react";
import { useAddNewUpdateMutation } from "../../../Services/SupportApi";
import Button from "../../../components/Button/index";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { Notification } from "../../../components/ToastNotification";
import { supportCreateNewValidation } from "../../../components/Validation/vaildate";

const CreateUpdate = () => {
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  // error
  useEffect(() => {
    setFormErrors(supportCreateNewValidation(data));
  }, [data]);

  const [AddNewUpdate, { data: response, error, isLoading }] =
    useAddNewUpdateMutation();

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
      setData({
        title: "",
        description: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and field are required", "error");
    } else {
      await AddNewUpdate(data);
    }
  };
  return (
    <div className="ss-trade_supportticket_page_wrapper">
      {/* <ScreenShot width={600} height={410} pageName={"Support-ticket-page"} /> */}
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_supporttickett_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Create Update</h2>
        </div>
        <div className="ss-trade_supportticket_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group"></div>
            <div className="form_group" style={{ display: "inherit" }}>
              <Input
                label="Title"
                type="text"
                name="title"
                placeholder="Enter your title here..."
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="input_field"
                value={data.title}
                inputGroupClass="left"
                isRequired={true}
              />
            </div>
            <div
              className="form_group text_area"
              style={{ display: "inherit" }}
            >
              <TextArea
                label="Your Message for All"
                name="description"
                cols="30"
                rows="10"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                value={data.description}
                className="question_field"
                placeholder="Write your message..."
                isRequired={true}
              />
            </div>
            <Button type="submit" className="submit_btn">
              {isLoading ? "Loading..." : "submit"}
            </Button>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default CreateUpdate;
