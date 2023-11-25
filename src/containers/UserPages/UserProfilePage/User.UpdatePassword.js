import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { updatePasswordValidate } from "../../../components/Validation/vaildate";
import {
  useAddOtpMutation,
  useEditPasswordMutation,
  useGetLoginUserQuery,
} from "../../../Services/userApi";

const UpdatePassword = () => {
  const { data: userData } = useGetLoginUserQuery();
  const [OTPup, setOTPup] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    current_password: "",
    confirm_new_password: "",
    new_password: "",
    otpCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // error
  useEffect(() => {
    setFormErrors(updatePasswordValidate(data));
  }, [data]);


  // send otp code
  const [addOtp, { error: otpError, data: otpData, isLoading: otpLoading }] = useAddOtpMutation();
  
  useEffect(() => {
    if (otpData?.message) {
      Notification(otpData?.message, "success");
      setOTPup(true);
    } else {
      Notification(otpError?.data?.message, "error");
      setOTPup(false);
    }
  }, [otpError, otpData]);

  const forOTP = async () => {
    const otp = {
      email: userData?.data?.email,
      userId: userData?.data?.userId.toLowerCase(),
    };
    await addOtp(otp);
  };

  // password update
  const [editPassword, { error, data: passwordData, isLoading }] =
    useEditPasswordMutation();
  useEffect(() => {
    if (passwordData?.message) {
      Notification(passwordData?.message, "success");
      setData({
        current_password: "",
        confirm_new_password: "",
        new_password: "",
        otpCode: "",
      });
      setOTPup(false);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, passwordData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      if (!data.otpCode) {
        const otp = {
          current_password: data.current_password,
          user_id: userData?.data?.userId.toLowerCase(),
        };
        await addOtp(otp);
      } else {
        if (data.otpCode < 0) {
          Notification("Only Number Is Allowed On OTP", "error");
        } else {
          await editPassword(data);
        }
      }
    }
  };
  return (
    <div className="ss-trade_updatepassword_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_accountpassword_card"
      >
        <div className="ss-trade_accountpassword_title">
          <h2>update password</h2>
        </div>
        <div className="ss-trade_accountpassword_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Current Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.current_password}
                name="current_password"
                placeholder="Enter your current password"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
                error={formErrors.current_password}
              />
              <Input
                label=""
                type="text"
                name=""
                placeholder=""
                className="input_field"
                inputGroupClass="right"
                isRequired={false}
                disabled={true}
                style={{ display: "none" }}
              />
            </div>
            <div className="form_group">
              <Input
                label="New Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.new_password}
                name="new_password"
                onChange={handleChange}
                placeholder="Enter your new password"
                inputGroupClass="left"
                isRequired={true}
                error={formErrors.new_password}
              />
              <Input
                label=""
                type="text"
                name=""
                placeholder=""
                className="input_field"
                inputGroupClass="right"
                isRequired={false}
                disabled={true}
                style={{ display: "none" }}
              />
            </div>
            <div className="form_group">
              <Input
                label="Confirm New Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.confirm_new_password}
                name="confirm_new_password"
                placeholder="Enter your new password"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
                error={formErrors.confirm_new_password}
              />
              <Input
                label=""
                type="text"
                name=""
                placeholder=""
                className="input_field"
                inputGroupClass="right"
                isRequired={false}
                disabled={true}
                style={{ display: "none" }}
              />
            </div>
            <div className="form-check form-check-label show_password form_group">
              <Input
                type="checkbox"
                className="form-check-input form-check-label"
                value="showpassword"
                id="showpassword"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showpassword" className="form-check-label">
                show Password
              </label>
            </div>
            {OTPup && (
              <div className="form_group form_group_OTP">
                <Input
                  label="OTP"
                  type="number"
                  name="otpCode"
                  placeholder="Enter OTP"
                  value={data.otpCode}
                  onChange={handleChange}
                  className="OTP_input_field input_field"
                  inputGroupClass="left"
                  isRequired={true}
                />
                <Button
                  type="button"
                  className="submit_btn OTP_resend_btn"
                  onClick={forOTP}
                >
                  Resend OTP
                </Button>
              </div>
            )}

            <div className="form_group">
              <Button type="submit" className="submit_btn" disabled={isLoading}>
                {isLoading || otpLoading ? "Loading..." : "update"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default UpdatePassword;
