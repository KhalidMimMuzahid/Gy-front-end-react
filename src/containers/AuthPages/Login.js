import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import CustomLink from "../../components/Link";
import { Notification } from "../../components/ToastNotification";
import { loginValidate } from "../../components/Validation/vaildate";
import { useAddLoginMutation } from "../../Services/userApi";
import {
  getLocalStorage,
  removeLocalStorage,
  savedLocalStorage,
} from "../../utils/function/localStorage";
import Footer from "../FrontPage/components/Footer";
import Header from "../FrontPage/components/Header";
import AuthCardLayout from "./AuthCardLayout";
import login from "../../../src/assets/login.png";

export let popupShow = false;
const Login = () => {
  const [errors, setErrors] = useState({}); // error catch
  const navigate = useNavigate();
  const [value, setValue] = useState({
    userId: "",
    password: "",
    otpCode: "",
  });
  const [captcha, setCaptcha] = useState({ x: 0, y: 0 });
  const [captchaRefresh, setCaptchaRefresh] = useState(false);
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // auth check
  useEffect(() => {
    if (getLocalStorage("safe_secure_token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // error
  useEffect(() => {
    setErrors(loginValidate(value));
  }, [value]);

  // add user
  const [addLogin, { error, data, isLoading }] = useAddLoginMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/dashboard");
      popupShow = true;
      savedLocalStorage("safe_secure_token", data?.token);
      removeLocalStorage("otp_timer");
    } else {
      Notification(error?.data?.message, "error");
      refresh();
    }
  }, [error, data, navigate]);

  if (JSON.parse(getLocalStorage("otp_timer"))) {
    setTimeout(() => {},
    parseInt(JSON.parse(getLocalStorage("otp_timer"))) * 1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification(errors?.userId || errors?.password, "error");
    } else {
      savedLocalStorage("otp_timer", 5000);
      if (captcha?.x + captcha?.y !== parseInt(value?.otpCode)) {
        Notification("Wrong Answer", "error");
        refresh();
        setValue({ ...value, [value?.otpCode]: "" });
      } else {
        const logData = {
          ...value,
          userId: value.userId,
        };
        await addLogin(logData);
      }
    }
  };
  useEffect(() => {
    setCaptcha({
      ...captcha,
      x: Math.floor(Math.random() * 10 + 1),
      y: Math.floor(Math.random() * 10 + 1),
    });
  }, [captchaRefresh]);

  const refresh = async () => {
    setCaptchaRefresh(!captchaRefresh);
  };
  const [showPassword, setShowPassword] = useState(false);
  const token = getLocalStorage("safe_secure_token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <>
      {/* <SocialIconeforLogin /> */}
      <Header />
      <div className="ss-trade_dashboard_login_page_wrapper">
        <AuthCardLayout
          style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
          className="ss-trade_dashboard_login_card ss-trade_all_card"
        >
          <div className="bar">
            <span></span>
          </div>
          <div className="login-body">
            <div className="half-width">
              <div className="left-content">
                {/* <h2>Welcome To Safe And Secure</h2>
                <p>Please log in to get acces to your account</p> */}
                <img src={login} />
              </div>
            </div>
            <div className="half-width">
              <div className="right-content">
                <div className="ss-trade_section_title">
                  <h2>Login</h2>
                </div>
                <div className="hr_border"></div>
                {/* <SocialIconForCardHearder /> */}
                <div className="ss-trade_dashboard_login_content">
                  <form onSubmit={handleSubmit}>
                    <div className="form_group" style={{ display: "inherit" }}>
                      <Input
                        label="User ID"
                        type="text"
                        name="userId"
                        placeholder="Enter your user ID"
                        onChange={handleChange}
                        value={value.userId}
                        className="userid_input input_field"
                        inputGroupClass="right"
                      />
                    </div>
                    <div className="form_group" style={{ display: "inherit" }}>
                      <Input
                        label="Password"
                        type={`${showPassword ? "text" : "password"}`}
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        value={value.password}
                        className="password_input input_field"
                        inputGroupClass="right"
                      />
                      <span
                        style={{ marginTop: "0px" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </span>
                    </div>
                    {true && (
                      <>
                        <div className="captchaContainer">
                          <p>{captcha?.x}</p>
                          <p>+</p>
                          <p>{captcha?.y}</p>
                          <p>=</p>
                          <input
                            name="otpCode"
                            onChange={handleChange}
                            value={value.otpCode}
                          />
                          <span onClick={() => refresh()} tooltip="refresh">
                            <HiOutlineRefresh />
                          </span>
                        </div>
                      </>
                    )}
                    <Button
                      type="submit"
                      className="submit_btn"
                      // disabled={OTPup}
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>
                    <div className="go_to_register">
                      <p>
                        <CustomLink href="/" className="log_page_nav_link">
                          Home
                        </CustomLink>{" "}
                      </p>
                      <p className="login_nav_break_point"> | </p>
                      <p>
                        <CustomLink
                          href="/register"
                          className="log_page_nav_link"
                        >
                          Register
                        </CustomLink>{" "}
                      </p>
                      <p className="login_nav_break_point"> | </p>
                      <p>
                        <CustomLink
                          href="/forgotPassword"
                          className="log_page_nav_link"
                        >
                          Forget Password
                        </CustomLink>{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </AuthCardLayout>
      </div>
      <Footer />
    </>
  );
};

export default Login;
