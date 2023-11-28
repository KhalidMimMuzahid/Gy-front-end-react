import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import CustomLink from "../../components/Link";
import { Notification } from "../../components/ToastNotification";
import { loginValidate } from "../../components/Validation/vaildate";
import { useAddLoginMutation } from "../../Services/userApi";
import Emailimage from "../../assets/email.png";
import {
  getLocalStorage,
  removeLocalStorage,
  savedLocalStorage,
} from "../../utils/function/localStorage";
import Footer from "../FrontPage/components/Footer";
import Header from "../FrontPage/components/Header";
import AuthCardLayout from "./AuthCardLayout";
import login from "../../../src/assets/login.png";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import GoogleLoginModal from "./googleLoginModal";
import { env } from "../../env";
import LoginModal from "./LoginModal ";
import { CgEyeAlt } from "react-icons/cg";

export let popupShow = false;
const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const sponsorid = location.search.split("=")[1];

  const [errors, setErrors] = useState({}); // error catch
  const navigate = useNavigate();
  const [value, setValue] = useState({
    userId: "",
    password: "",
    otpCode: "",
  });
  const [captcha, setCaptcha] = useState({ x: 0, y: 0 });
  const [captchaRefresh, setCaptchaRefresh] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
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

  const handleEmailLogin = () => {
    setOpenLoginModal(!openLoginModal);
  };

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
  const {
    responseGoogle,
    resFailed,
    openModal,
    setOpenModal,
    modalRef,
    value: values,
    setValue: setValues,
    handleGoogleLogin,
    handleOnChange,
    loading,
  } = useGoogleLogin();
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
                  <Button
                    type="submit"
                    className="submit_btn"
                    disabled={isLoading}
                    onClick={handleEmailLogin}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <img
                          style={{ height: "25px", width: "25px" }}
                          src={Emailimage}
                          alt="email image"
                        />
                      </div>
                      <div>Continue With Email</div>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    className="submit_btn"
                    onClick={() => {
                      console.log("google clicked");
                    }}
                  >
                    <div className="google_btn">
                      <GoogleLogin
                        clientId={env.google_client_id}
                        render={(renderProps) => (
                          <button
                            className="google_login_btn"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <div>
                                <FcGoogle size={25} />
                              </div>
                              <div>Continue With Google</div>
                            </div>
                          </button>
                        )}
                        buttonText="Sign in with google"
                        onSuccess={responseGoogle}
                        onFailure={resFailed}
                        cookiePolicy={"single_host_origin"}
                        style={{ backgroundColor: "#BDF9FF" }}
                      />
                    </div>
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
                </div>
              </div>
            </div>
          </div>
        </AuthCardLayout>
      </div>
      {openLoginModal && <LoginModal handleEmailLogin={handleEmailLogin} />}
      {openModal && (
        <GoogleLoginModal
          handleGoogleLogin={handleGoogleLogin}
          handleOnChange={handleOnChange}
          openModal={openModal}
          setOpenModal={setOpenModal}
          value={values}
          setValue={setValues}
          isSponsorId={sponsorid || "admin"}
          loading={loading}
        />
      )}
      <Footer />
    </>
  );
};

export default Login;
