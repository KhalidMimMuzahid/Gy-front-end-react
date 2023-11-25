import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { updateTrxPasswordValidate } from "../../../components/Validation/vaildate";
import {
  useAddOtpMutation,
  useEditTrxPasswordMutation,
  useGetLoginUserQuery,
} from "../../../Services/userApi";

const UpdateTrxPassword = () => {
  const { data: userData } = useGetLoginUserQuery();
  const [OTPup, setOTPup] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    current_trx_password: "",
    new_trx_password: "",
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
    setFormErrors(updateTrxPasswordValidate(data));
  }, [data]);

  const forOTP = async () => {
    const otp = {
      user_id: userData?.data?.userId.toUpperCase(),
      current_trx_password: data.current_trx_password,
    };
    if (data.otpCode < 0) {
      Notification("Only Number Is Allowed On OTP", "error");
    } else {
      await addOtp(otp);
    }
  };

  // send otp code
  const [addOtp, { error: otpError, data: otpData }] = useAddOtpMutation();
  useEffect(() => {
    if (otpData?.message) {
      Notification(otpData?.message, "success");
      setOTPup(true);
    } else {
      Notification(otpError?.data?.message, "error");
      setOTPup(false);
    }
  }, [otpError, otpData]);

  // trx password update
  const [editTrxPassword, { error, data: trxPassData, isLoading }] =
    useEditTrxPasswordMutation();
  useEffect(() => {
    if (trxPassData?.message) {
      Notification(trxPassData?.message, "success");
      setData({
        current_trx_password: "",
        new_trx_password: "",
        otpCode: "",
      });
      setOTPup(false);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, trxPassData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      if (!data.otpCode) {
        const otp = {
          user_id: userData?.data?.userId,
          current_trx_password: data.current_trx_password,
        };
        await addOtp(otp);
      } else {
        await editTrxPassword(data);
      }
    }
  };

  // random trx password generate
  const generateTrxPass = () => {
    let chars =
      "01234DQRS#T_567dUVWefim@nFGH-89ab$cIJKLopstuv#EMNjklOPwxyzAq#BghCX&YZ";
    let passwordLength = 20;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setData({
      ...data,
      new_trx_password: password,
    });
  };
  return (
    <div className="ss-trade_updatepassword_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_accountpassword_card"
      >
        <div className="ss-trade_accountpassword_title">
          <h2>update Transaction password</h2>
        </div>
        <div className="ss-trade_accountpassword_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Current Transaction Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.current_trx_password}
                name="current_trx_password"
                placeholder="Enter your current Transaction password"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
              />
              <Input
                label="New Transaction Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.new_trx_password}
                name="new_trx_password"
                onChange={handleChange}
                placeholder="Enter your new Transaction password"
                inputGroupClass="right"
                isRequired={true}
                error={formErrors.new_trx_password}
              />
              <Button
                type="button"
                className="submit_btn generate_password"
                onClick={generateTrxPass}
              >
                Generate
              </Button>
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
                {isLoading ? "Loading..." : "update"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default UpdateTrxPassword;
