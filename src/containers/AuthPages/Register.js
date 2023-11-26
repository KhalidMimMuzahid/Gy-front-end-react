import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import CustomLink from "../../components/Link";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Footer from "../FrontPage/components/Footer";
import Header from "../FrontPage/components/Header";
import { Validate } from "../../components/Validation/vaildate";
// import SocialIconeforLogin from "../../components/SideBarSocialIcon/SocialIconeforLogin";
import SocialIconForCardHearder from "../../components/SideBarSocialIcon/SocialIconForCardHearder";
import Particle from "../FrontPage/components/Particle";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import PhoneNumberInput from "./phone-number-input";
import { env } from "../../env";
import {
  useAddOtpMutation,
  useAddUserMutation,
  useGetValidateEmailQuery,
  useGetValidateMobileQuery,
  useGetValidateSponsorIdQuery,
} from "../../Services/userApi";
import { Notification } from "../../components/ToastNotification";
import AuthCardLayout from "./AuthCardLayout";
import { getLocalStorage } from "../../utils/function/localStorage";
import register from "../../assets/register.png";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import GoogleLoginModal from "./googleLoginModal";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //for visible registered form
  const [reg, ShowReg] = useState(false);
  const [OTPup, setOTPup] = useState(false);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const sponsorid = parsed.sponsorid;
  const navigate = useNavigate();
  const [sponsorName, setSponsorName] = useState("");
  const [mobile, setMobile] = useState();
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    sponsorId: sponsorid || "admin",
    sponsorName: sponsorName,
    password: "",
    confirmPassword: "",
    otpCode: "",
    mobile: mobile,
    role: "user",
  });
  useEffect(() => {
    setUser({ ...user, mobile: mobile, sponsorName: sponsorName });
  }, [mobile, sponsorName]);
  const [eerros, setEerror] = useState("");
  const [merror, setMerror] = useState("");
  const [sponError, setSponError] = useState("");
  const [formErrors, setFormErrors] = useState({}); // form error
  //function for show/hide form
  const handelShowForm = () => {
    ShowReg(!reg);
    console.log(reg);
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // sponosr id validate
  const { data: sponsoridData, error: sponsoridError } =
    useGetValidateSponsorIdQuery(
      sponsorid?.toUpperCase() || user?.sponsorId?.toUpperCase()
    );
  useEffect(() => {
    if (sponsoridError?.data?.message) {
      setSponsorName("");
      setSponError(sponsoridError?.data?.message);
    } else if (sponsoridData?.name) {
      setSponError("");
      setSponsorName(sponsoridData?.name);
    }
  }, [sponsoridError?.data, sponsoridData?.name]);
  const [addUser, { data, error, isLoading }] = useAddUserMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/login");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

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

  // error
  useEffect(() => {
    setFormErrors(Validate(user));
  }, [mobile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      if (checked === true) {
        Notification("Kindly checked agree our terms & conditions", "error");
      } else if (!user.otpCode) {
        const otp = {
          email: user.email,
          mobile: mobile,
        };
        await addOtp(otp);
      } else {
        const dataUser = {
          ...user,
          sponsorName: sponsorName,
          sponsorId: user.sponsorId,
          mobile: mobile,
        };
        if (user.otpCode < 0) {
          Notification("Only Number Is Allowed On OTP", "error");
        } else {
          // console.log(dataUser);
          await addUser(dataUser);
        }
      }
    }
  };
  const OTP_resend = async () => {
    const otp = {
      email: user.email,
      mobile: mobile,
    };
    await addOtp(otp);
  };
  const [showPassword, setShowPassword] = useState(false);
  // redirect
  const token = getLocalStorage("safe_secure_token");
  // const location = useLocation();
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
    value,
    setValue,
    handleGoogleLogin,
    handleOnChange,
    loading,
  } = useGoogleLogin();
  return (
    <>
      {/* <SocialIconeforLogin /> */}
      <Header />
      <div className="ss-trade_dashboard_register_page_wrapper">
        <AuthCardLayout
          style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
          className="ss-trade_dashboard_register_card"
        >
          <div className="bar">
            <span></span>
          </div>
          <div className="register-body">
            <div className="half-width">
              <div className="left-content">
                {/* <h2>Welcome To Safe And Secure</h2>
                <p>Please register in to get acces to your account</p>
                 */}
                <img src={register} />
              </div>
            </div>
            <div className="half-width">
              <div className="right-content">
                <div className="ss-trade_section_title">
                  <h2>Register</h2>
                </div>
                <div className="hr_border"></div>
                {/* <SocialIconForCardHearder /> */}
                <div className="ss-trade_dashboard_register_content">
                  <div className="button_containe">
                    <Button
                      type="submit"
                      className="submit_btn"
                      disabled={isLoading}
                      onClick={handelShowForm}
                    >
                      Register With Email
                    </Button>
                    <Button
                      type="submit"
                      className="submit_btn"
                      disabled={isLoading}
                    >
                      <div className="google_btn">
                        <GoogleLogin
                          clientId={env.google_client_id}
                          buttonText="Sign in with google"
                          onSuccess={responseGoogle}
                          onFailure={resFailed}
                          cookiePolicy={"single_host_origin"}
                          style={{ backgroundColor: "#BDF9FF" }}
                        />
                      </div>
                    </Button>
                  </div>
                  {/* Render based on reg State True/False */}
                  {reg && (
                    <form onSubmit={handleSubmit}>
                      <div className="form_group">
                        <div>
                          <Input
                            label="Sponsor ID"
                            type="text"
                            name="sponsorId"
                            placeholder="Enter your sponsor id"
                            value={user.sponsorId || sponsorid}
                            onChange={handleChange}
                            className="input_field"
                            inputGroupClass="left"
                            disabled={parsed.sponsorid ? true : false}
                            isRequired={true}
                          />
                          {!formErrors.sponsorId?.includes("required") && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "10px",
                              }}
                            >
                              {formErrors.sponsorId}
                            </p>
                          )}
                          {!formErrors.sponsorId &&
                            !sponError.includes("Not Found") && (
                              <p
                                style={{
                                  color: !sponError.includes("Invalid")
                                    ? "green"
                                    : "red",
                                  fontSize: "13px",
                                }}
                              >
                                {sponError}
                              </p>
                            )}
                        </div>

                        <div>
                          <Input
                            label="Full Name"
                            type="text"
                            name="fullName"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            className="name_input input_field"
                            inputGroupClass="left"
                            isRequired={true}
                            error={formErrors.fullName}
                          />
                        </div>
                        {/* <Input
                  label="Sponsor Name"
                  type="text"
                  name="sponsorName"
                  placeholder="Enter your sponsor name"
                  onChange={handleChange}
                  className="input_field for_margin_top"
                  inputGroupClass="right"
                  // value={user.sponsorName}
                  value={sponsorName}
                  disabled={true}
                /> */}
                      </div>
                      <div className="form_group">
                        <div>
                          <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="email_input input_field"
                            inputGroupClass="right"
                            isRequired={true}
                          />
                          {!formErrors.email?.includes("required") && (
                            <p
                              style={{
                                color: "red",
                                fontSize: "13px",
                              }}
                            >
                              {formErrors.email}
                            </p>
                          )}
                          {!formErrors.email &&
                            !eerros.includes("Not Found") && (
                              <p
                                style={{
                                  color: eerros.includes("Available")
                                    ? "green"
                                    : "red",
                                  fontSize: "13px",
                                }}
                              >
                                {eerros}
                              </p>
                            )}
                        </div>
                        <div>
                          <label htmlFor="phone-input">
                            Mobile <span style={{ color: "red" }}>*</span>
                          </label>
                          <PhoneInput
                            international
                            defaultCountry="IN"
                            countryCallingCodeEditable={false}
                            placeholder="Enter your phone number"
                            value={mobile}
                            onChange={setMobile}
                            name="mobile"
                            error={
                              mobile
                                ? isValidPhoneNumber(mobile)
                                  ? undefined
                                  : "Invalid phone number"
                                : "Phone number required"
                            }
                            style={{
                              border: "1px solid #b1b7c1",
                              width: "100%",
                              padding: "6px 0",
                              borderRadius: "0 3px 3px 0",
                            }}
                          />
                          <p style={{ fontSize: "13px", width: "100%" }}>
                            {mobile ? (
                              isValidPhoneNumber(mobile) ? undefined : (
                                <span style={{ color: "red" }}>
                                  {(formErrors.mobile = "Invalid phone number")}
                                </span>
                              )
                            ) : (
                              <span style={{ color: "red" }}>
                                {
                                  (formErrors.mobile =
                                    "Phone number is required")
                                }
                              </span>
                            )}
                          </p>
                          {!formErrors.mobile && (
                            <p
                              style={{
                                color: merror.includes("available")
                                  ? "green"
                                  : "red",
                                fontSize: "13px",
                                width: "100%",
                              }}
                            >
                              {merror}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* <div
                className="form_group"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <label htmlFor="phone-input">
                  Mobile <span style={{ color: "red" }}>*</span>
                </label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  countryCallingCodeEditable={false}
                  placeholder="Enter your phone number"
                  value={mobile}
                  onChange={setMobile}
                  name="mobile"
                  error={
                    mobile
                      ? isValidPhoneNumber(mobile)
                        ? undefined
                        : "Invalid phone number"
                      : "Phone number required"
                  }
                  style={{
                    border: "1px solid #b1b7c1",
                    width: "100%",
                    padding: "6px 0",
                    borderRadius: "0 3px 3px 0",
                  }}
                />
                <p style={{ fontSize: "13px", width: "100%" }}>
                  {mobile ? (
                    isValidPhoneNumber(mobile) ? undefined : (
                      <span style={{ color: "red" }}>
                        {(formErrors.mobile = "Invalid phone number")}
                      </span>
                    )
                  ) : (
                    <span style={{ color: "red" }}>
                      {(formErrors.mobile = "Phone number is required")}
                    </span>
                  )}
                </p>
                {!formErrors.mobile && (
                  <p
                    style={{
                      color: merror.includes("available") ? "green" : "red",
                      fontSize: "13px",
                      width: "100%",
                    }}
                  >
                    {merror}
                  </p>
                )}
              </div> */}
                      <div className="form_group">
                        <div>
                          <Input
                            label="Password"
                            type={`${showPassword ? "text" : "password"}`}
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="input_field"
                            inputGroupClass="left"
                            isRequired={true}
                            error={formErrors.password}
                          />
                        </div>
                        <div>
                          <Input
                            label="Confirm Password"
                            type={`${showPassword ? "text" : "password"}`}
                            name="confirmPassword"
                            placeholder="Enter your confirm password"
                            onChange={handleChange}
                            className="input_field"
                            inputGroupClass="right"
                            isRequired={true}
                            error={formErrors.confirmPassword}
                          />
                        </div>
                      </div>
                      {OTPup && (
                        <div className="form_group form_group_OTP">
                          <Input
                            label="OTP"
                            type="number"
                            name="otpCode"
                            placeholder="Enter OTP"
                            onChange={handleChange}
                            className="OTP_input_field input_field"
                            inputGroupClass="left"
                            isRequired={true}
                          />
                          <Button
                            type="button"
                            className="OTP_resend_btn"
                            onClick={() => OTP_resend()}
                          >
                            Resend OTP
                          </Button>
                        </div>
                      )}
                      <div
                        className="form-check form-check-label show_password form_group"
                        style={{
                          userSelect: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          type="checkbox"
                          className="form-check-input form-check-label"
                          value="showpassword"
                          id="showpassword"
                          onChange={() => setShowPassword(!showPassword)}
                        />
                        <label
                          htmlFor="showpassword"
                          className="form-check-label"
                        >
                          &nbsp;Show Password
                        </label>
                      </div>
                      <div
                        className="form-check form-check-label show_password form_group"
                        style={{
                          userSelect: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Input
                          type="checkbox"
                          className="form-check-input form-check-label"
                          value="termscondition"
                          id="termscondition"
                          defaultChecked={checked}
                          onChange={() => {
                            setChecked(!checked);
                          }}
                        />
                        <label
                          htmlFor="termscondition"
                          className="form-check-label"
                        >
                          &nbsp;I agree to{" "}
                          <CustomLink
                            to="/termsconditions"
                            style={{ color: "#4885ed" }}
                          >
                            Terms & Conditions
                          </CustomLink>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="submit_btn"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Register"}
                      </Button>
                      <div className="go_to_login">
                        <p>
                          <CustomLink href="/" className="log_page_nav_link">
                            Home
                          </CustomLink>{" "}
                        </p>
                        <p className="login_nav_break_point"> | </p>
                        <p>
                          <CustomLink
                            href="/login"
                            className="log_page_nav_link"
                          >
                            Login
                          </CustomLink>{" "}
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AuthCardLayout>
      </div>
      {openModal && (
        <GoogleLoginModal
          handleGoogleLogin={handleGoogleLogin}
          handleOnChange={handleOnChange}
          openModal={openModal}
          setOpenModal={setOpenModal}
          value={value}
          setValue={setValue}
          isSponsorId={sponsorid || "admin"}
          loading={loading}
        />
      )}
      <Footer />
    </>
  );
};

export default Register;
