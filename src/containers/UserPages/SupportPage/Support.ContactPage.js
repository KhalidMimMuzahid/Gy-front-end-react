import React, { useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { supportValidate } from "../../../components/Validation/vaildate";
import { useAddContactMessageMutation } from "../../../Services/SupportApi";
import { useGetLoginUserQuery } from "../../../Services/userApi";
const ContactPage = () => {
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [addContactMessage, { data: response, error, isLoading }] =
    useAddContactMessageMutation();
  const { data: userinfo } = useGetLoginUserQuery();
  const [data, setData] = useState({
    name: userinfo?.data?.fullName,
    user_id: userinfo?.data?.userId,
    email: userinfo?.data?.email,
    message: "",
  });

  // error
  useEffect(() => {
    setFormErrors(supportValidate(data));
  }, [data]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);
  const handleSubmit = async () => {
    if (Object.keys(formErrors).length > 0) {
      Notification("All field are required", "error");
    } else {
      await addContactMessage(data);
    }
  };
  return (
    <div className="ss-trade_contact_page_wrapper">
      <div className="ss-trade_contact_page_inner_part">
        <div className="ss-trade_contact_title">
          <h2>Contact Us</h2>
        </div>
        <div className="ss-trade_containers">
          <div className="ss-trade_input_fields">
            <div className="fields">
              <div className="form_group">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  onChange={handleChange}
                  inputGroupClass="right"
                  isRequired={true}
                  value={data.name}
                />
              </div>
              <div className="form_group">
                <Input
                  label="User ID"
                  type="text"
                  placeholder="Enter your user Id"
                  name="user_id"
                  onChange={handleChange}
                  inputGroupClass="right"
                  isRequired={true}
                  value={data.user_id}
                />
              </div>
              <div className="form_group">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  inputGroupClass="right"
                  isRequired={true}
                  value={data.email}
                />
              </div>
            </div>
          </div>
          <div className="ss-trade_message_box">
            <label htmlFor="message">
              Message<span style={{ color: "red" }}> *</span>{" "}
            </label>
            <textarea
              name="message"
              cols="30"
              className="message_box"
              rows="10"
              placeholder="Write your message..."
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <Button type="button" className="send_button" onClick={handleSubmit}>
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;
