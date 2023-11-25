import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import CustomLink from "../../components/Link";
import { Notification } from "../../components/ToastNotification";
import { loginValidate } from "../../components/Validation/vaildate";
import {
  useAddLoginMutation,
  useAddUserVerifyMutation,
} from "../../Services/userApi";
import {
  getLocalStorage,
  savedLocalStorage,
} from "../../utils/function/localStorage";
import AuthCardLayout from "./AuthCardLayout";
import Header from "../FrontPage/components/Header";
import Footer from "../FrontPage/components/Footer";
export let popupShow = false;
const VerifyUser = () => {
  const { token } = useParams();
  const [addVerifyUser] = useAddUserVerifyMutation();
  useEffect(() => {
    const verified = async () => {
      await addVerifyUser(token);
    };
    verified();
  }, [addVerifyUser, token]);

  const [errors, setErrors] = useState({}); // error catch
  const [value, setValue] = useState({
    userId: "",
    password: "",
  });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  // auth check
  useEffect(() => {
    if (getLocalStorage("ss-trade_Aa_uth_access")) {
      navigate("/dashboard");
    }
  }, [navigate]);
  useEffect(() => {
    setErrors(loginValidate(value));
  }, [value]);

  const [addLogin, { error, data, isLoading }] = useAddLoginMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/dashboard");
      savedLocalStorage("ss-trade_Aa_uth_access", data?.data?.token);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      const logData = {
        ...value,
        userId: value.userId,
        password: value.password,
      };
      await addLogin(logData);
    }
  };

  // show password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header />
      <div className="ss-trade_dashboard_login_page_wrapper">
        <AuthCardLayout
          className="ss-trade_dashboard_login_card tp_all_card"
        >
          <div className="ss-trade_section_title">
            <h2>Login</h2>
          </div>
          <div className="hr_border"></div>
          <div className="ss-trade_dashboard_login_content">
            <form onSubmit={handleSubmit}>
              <div className="form_group" style={{ display: "inherit" }}>
                <Input
                  label="Userid"
                  type="text"
                  name="userId"
                  placeholder="Enter Your Userid"
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
                  placeholder="Enter Your Password"
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
              <p
                className="forgot_password"
                id="forget_pass"
                style={{
                  textAlign: " end",
                  fontSize: "14px",
                  color: "#db1f1f !important",
                }}
              >
                <CustomLink
                  href="/forgotPassword"
                  style={{
                    color: "red !important",
                    textDecoration: "underline !important",
                  }}
                >
                  Forget Password?
                </CustomLink>{" "}
              </p>
              <Button type="submit" className="submit_btn">
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <div className="go_to_register">
                <p>
                  Need an account?{" "}
                  <CustomLink href="/register" className="log_page_nav_link">
                    Register
                  </CustomLink>{" "}
                </p>
              </div>
            </form>
          </div>
        </AuthCardLayout>
      </div>
      <Footer />
    </>
  );
};

export default VerifyUser;
