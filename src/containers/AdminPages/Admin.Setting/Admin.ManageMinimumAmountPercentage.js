import React, { useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
// import { Notification } from "../../../components/ToastNotification";
import Button from "../../../components/Button";

const ManageMinimumAmountPercentage = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const handleChange = (e) => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.keys(formErrors).length > 0) {
    //   Notification("All condition are required", "error");
    // } else {
    //   if (!data.otpCode) {
    //     const otp = {
    //       user_id: "admin",
    //       currentEmail: data.currentEmail,
    //       new_email: data.new_email,
    //     };
    //     await addOtp(otp);
    //   } else {
    //     if (data.otpCode < 0) {
    //       Notification("Only Number Is Allowed On OTP", "error");
    //     } else {
    //       await editEmail(data);
    //     }
    //   }
    // }
  };
  return (
    <div className="ss-trade_updatepassword_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_accountpassword_card"
      >
        <div className="ss-trade_accountpassword_title">
          <h2>update email</h2>
        </div>
        <div className="ss-trade_accountpassword_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Current Email"
                type="email"
                value={data.currentEmail}
                name="currentEmail"
                placeholder="Enter your current email"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
              />
              <Input
                label="New Email"
                type="email"
                value={data.new_email}
                name="new_email"
                onChange={handleChange}
                placeholder="Enter your new email"
                inputGroupClass="right"
                isRequired={true}
                error={formErrors.new_email}
              />
            </div>

            <div className="form_group">
              <Button type="submit" className="submit_btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "update"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default ManageMinimumAmountPercentage;
