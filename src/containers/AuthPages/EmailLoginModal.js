import React, { useState, useEffect } from "react";
import "../../styles/containers/AuthPage/googleloginform.scss";
import { GoAlert } from "react-icons/go";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import {
  useGetValidateMobileQuery,
  useAddGoogleLoginMutation,
  useAddOtpMutation,
  useAddUserMutation,
  useGetValidateSponsorIdQuery,
  useCheckUserEmailMutation,
  useCheckUserEmailQuery,
  useCheckUserOTPQuery,
} from "../../Services/userApi";
import { Notification } from "../../components/ToastNotification";
import { useNavigate } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const EmailLoginModal = ({ handelEmailModal }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otpCode: "",
    sponsorid: "",
  });
  const [hideEmail, setHideEmail] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [hideSponsore, setHideSponsore] = useState(false);
  const [alreadyLogin, setalreadyLogin] = useState(false);
  const [OTPValid, setOTPValid] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  const [Error, setError] = useState("");
  const [OTPup, setOTPup] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const navigate = useNavigate();
  const [addOtp, { error: otpError, data: otpData }] = useAddOtpMutation();
  const [addUser, { data, error, isLoading }] = useAddUserMutation();
  const { data: sponsoridData, error: sponsoridError } =
    useGetValidateSponsorIdQuery(formState?.sponsoreid);

  const { data: emailCheck, error: emailError } = useCheckUserEmailQuery(
    formState.email
  );
  const { data: OTPCheck, error: OTPError } = useCheckUserOTPQuery(
    formState.otpCode
  );

  useEffect(() => {
    if (OTPError?.message) {
      setOTPValid(false);
      setBtnDisable(true);
    } else if (OTPCheck?.data) {
      setOTPValid(true);
      setBtnDisable(false);
    } else {
      setOTPValid(false);
    }
  }, [OTPCheck?.data, OTPError]);

  useEffect(() => {
    if (emailError?.data?.message) {
      console.log("object");
      const otp = {
        email: formState.email,
      };
      addOtp(otp);
      setalreadyLogin(false);
    } else if (emailCheck?.data) {
      console.log("object hello");

      setalreadyLogin(true);
    }
  }, [emailError?.data, emailCheck?.data.email]);

  // useEffect(() => {
  //   const otp = {
  //     email: user.email,
  //   };
  //   addOtp(otp);
  // }, []);

  useEffect(() => {
    if (formState.email == "") {
      setError("Email is Required");
      setBtnDisable(true);
    } else {
      setError("");
      setBtnDisable(false);
    }
  }, [formState.email]);

  useEffect(() => {
    if (formState.password === "" || formState.confirmPassword === "") {
      // setError("Password is Required");
      setBtnDisable(true);
    } else if (formState.otp === "") {
    } else if (formState.password !== formState.confirmPassword) {
      setError("Password Not Match");
      setBtnDisable(true);
    } else if (formState.otp === "") {
      setError("OTP is Required");
      setBtnDisable(true);
    } else {
      setError("");
      setBtnDisable(false);
    }
  }, [formState.password, formState.confirmPassword, formState.otpCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handelEmail = () => {
    setHideEmail(true);
    setHidePassword(true);
  };
  const handelPassword = () => {
    console.log("hello");
    setHidePassword(!hidePassword);
    setHideSponsore(true);
  };

  // send otp code
  useEffect(() => {
    if (otpData?.message) {
      Notification(otpData?.message, "success");
      setOTPup(true);
    } else {
      Notification(otpError?.data?.message, "error");
      setOTPup(false);
    }
  }, [otpError, otpData]);
  console.log("my response", data);
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/login");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  useEffect(() => {
    if (sponsoridError?.data?.message) {
      // setSponError(sponsoridError?.data?.message);
      setSponsorName("");
    } else if (sponsoridData?.name) {
      setSponsorName(sponsoridData?.name);
    }
  }, [sponsoridError?.data, sponsoridData?.name]);

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (Object.keys(Error).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      const dataUser = {
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
        otpCode: formState.otpCode,
        sponsorid: formState.sponsorid,
      };
      console.log(dataUser);
      await addUser(dataUser);
    }

    console.log({ formState });
  };

  return (
    <>
      <div className="googleloginmodal_wrapper">
        <form onSubmit={handleEmailSignUp}>
          <div className="modal_header">
            <div className="modal_title">
              <h2>Additional Information</h2>
              <span onClick={() => handelEmailModal(false)}>
                <RxCross1 size={20} />
              </span>
            </div>
          </div>
          <div className="modal_body">
            {!hideEmail && (
              <div>
                <div className="form_group">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    value={formState.email || ""}
                    required
                  />
                </div>
                {alreadyLogin && (
                  <p className="invalid">Email Already in Use</p>
                )}
                <div className="modal_footer">
                  <button
                    onClick={handelEmail}
                    disabled={btnDisable}
                    className="submit_btn"
                  >
                    {"Continue"}
                  </button>
                </div>
              </div>
            )}

            {hidePassword && (
              <div>
                <div className="form_group">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="password"
                    value={formState.password || ""}
                    required
                  />
                </div>
                <div className="form_group">
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    value={formState.confirmPassword || ""}
                    required
                  />
                </div>
                <div className="form_group">
                  <input
                    type="text"
                    name="otpCode"
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    value={formState.otpCode || ""}
                    required
                  />
                </div>
                {Error && <p className="invalid">{Error}</p>}
                {OTPValid ? (
                  <div style={{ display: "flex" }}>
                    <FaCheckDouble size={15} color="green" />
                    <p className="valid">Valid OTP</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", margin: 0 }}>
                    <RxCross1 size={15} color="red" />
                    <p className="invalid">Invalid OTP</p>
                  </div>
                )}
                <div className="modal_footer">
                  <button
                    onClick={handelPassword}
                    disabled={btnDisable}
                    className="submit_btn"
                  >
                    {"Continue"}
                  </button>
                </div>
              </div>
            )}

            {hideSponsore && (
              <div>
                <div className="form_group">
                  <input
                    type="text"
                    name="sponsoreid"
                    onChange={handleChange}
                    placeholder="Enter Sponsore Id"
                    value={formState.sponsoreid || ""}
                  />
                </div>
                {sponsorName ? (
                  <p>
                    {`Your Sponsor Name: `}
                    <span>{sponsorName}</span>
                  </p>
                ) : (
                  <p className="invalid">Invalid Sponsore Id</p>
                )}
                <div className="modal_footer">
                  <button type="submit" className="submit_btn">
                    {"Done"}
                  </button>
                  <button type="submit" className="submit_btn">
                    {"Skip"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailLoginModal;
