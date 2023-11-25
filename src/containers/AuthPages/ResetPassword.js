import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import CardLayout from "../../components/CardLayout";
import Input from "../../components/Input";
import CustomLink from "../../components/Link";
import Footer from "../FrontPage/components/Footer";
import Header from "../FrontPage/components/Header";
import SocialIconeforLogin from "../../components/SideBarSocialIcon/SocialIconeforLogin";
import SocialIconForCardHearder from "../../components/SideBarSocialIcon/SocialIconForCardHearder";
import Particle from "../FrontPage/components/Particle";
import { resetPasswordValidate } from "../../components/Validation/vaildate";
import { useAddResetPassMutation } from "../../Services/userApi";
import { Notification } from "../../components/ToastNotification";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValue] = useState({
    password: "",
  });
  const handleChange = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // error
  useEffect(() => {
    setErrors(resetPasswordValidate(values));
  }, [values]);

  // add user
  const [addResetPass, { error, data, isLoading }] = useAddResetPassMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/login");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All condition are required", "error");
    } else {
      const urlData = {
        token: token,
        password: values.password,
      };
      await addResetPass(urlData);
    }
  };
  return (
    <>
      {/* <SocialIconeforLogin /> */}
      <Header />
      <div className="ss-trade_dashboard_resetpassword_page_wrapper">
        <CardLayout
          style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
          className="ss-trade_dashboard_resetpassword_card"
        >
          <div className="ss-trade_section_title">
            <h2>Reset Password</h2>
          </div>
          <div className="hr_border"></div>
          {/* <SocialIconForCardHearder /> */}
          <div className="ss-trade_dashboard_resetpassword_content">
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <Input
                  label="New Password"
                  type="text"
                  name="password"
                  placeholder="Enter your new password"
                  onChange={handleChange}
                  className="email_input input_field"
                  inputGroupClass="right"
                  error={errors.password}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="submit_btn">
                {isLoading ? "Loading..." : "Reset"}
              </Button>
              <div className="go_to_register">
                <p>
                  <CustomLink href="/" className="log_page_nav_link">
                    Home
                  </CustomLink>{" "}
                </p>
                <p className="login_nav_break_point"> | </p>
                <p>
                  <CustomLink href="/register" className="log_page_nav_link">
                    Register
                  </CustomLink>{" "}
                </p>
                <p className="login_nav_break_point"> | </p>
                <p>
                  <CustomLink href="/login" className="log_page_nav_link">
                    Login
                  </CustomLink>{" "}
                </p>
              </div>
            </form>
          </div>
        </CardLayout>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
