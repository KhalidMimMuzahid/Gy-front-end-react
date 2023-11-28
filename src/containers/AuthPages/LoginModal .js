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
  useAddLoginMutation,
} from "../../Services/userApi";
import { Notification } from "../../components/ToastNotification";
import { useNavigate } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import {
  getLocalStorage,
  removeLocalStorage,
  savedLocalStorage,
} from "../../utils/function/localStorage";
import Input from "../../components/Input";
import { CgEyeAlt } from "react-icons/cg";
import { AiFillEyeInvisible } from "react-icons/ai";

const LoginModal = ({ handleEmailLogin }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [hideEmail, setHideEmail] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [hideSponsore, setHideSponsore] = useState(false);
  const [alreadyLogin, setalreadyLogin] = useState(false);
  const [OTPValid, setOTPValid] = useState(false);
  const [Error, setError] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const token = getLocalStorage("safe_secure_token");

  const navigate = useNavigate();
  const [addOtp, { error: otpError, data: otpData }] = useAddOtpMutation();
  // const [addUser, { data, error, isLoading }] = useAddUserMutation();
  const [addLogin, { error, data, isLoading }] = useAddLoginMutation();
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/dashboard");

      savedLocalStorage("safe_secure_token", data?.token);
      removeLocalStorage("otp_timer");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (formState.email == "") {
      setError("Email is Required");
      setBtnDisable(true);
    } else {
      setError("");
      setBtnDisable(false);
    }
  }, [formState.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handelEmail = () => {
    setHideEmail(true);
    setHidePassword(true);
  };

  // useEffect(() => {
  //   if (data?.message) {
  //     Notification(data?.message, "success");
  //     navigate("/login");
  //   } else {
  //     Notification(error?.data?.message, "error");
  //   }
  // }, [error, data, navigate]);

  const handleEmailLogIn = async (e) => {
    e.preventDefault();
    console.log("hello");
    if (Object.keys(Error).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      const dataUser = {
        email: formState.email,
        password: formState.password,
      };
      console.log(dataUser);
      await addLogin(dataUser);
    }
    // if (Object.keys(errors).length > 0) {
    //   Notification(errors?.userId || errors?.password, "error");
    // } else {
    //   savedLocalStorage("otp_timer", 5000);
    //   if (captcha?.x + captcha?.y !== parseInt(value?.otpCode)) {
    //     Notification("Wrong Answer", "error");
    //     refresh();
    //     setValue({ ...value, [value?.otpCode]: "" });
    //   } else {
    //     const logData = {
    //       ...value,
    //       userId: value.userId,
    //     };
    //     await addLogin(logData);
    //   }
    // }
    console.log({ formState });
  };

  const handelhide = () => {
    setShowPasswordIcon(!showPasswordIcon);
  };
  return (
    <>
      <div className="googleloginmodal_wrapper">
        <form onSubmit={handleEmailLogIn}>
          <div className="modal_header">
            <div className="modal_title">
              <h2>Login Information</h2>
              <span onClick={() => handleEmailLogin(false)}>
                <RxCross1 size={20} />
              </span>
            </div>
          </div>
          <div className="modal_body">
            <div>
              <div className="form_group">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="input_field"
                  inputGroupClass="left"
                  isRequired={true}
                />
              </div>
              <div className="form_group">
                <Input
                  label="Password"
                  type={`${showPasswordIcon ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="input_field"
                  inputGroupClass="left"
                  isRequired={true}
                />
                {showPasswordIcon ? (
                  <div className="hideicon">
                    <AiFillEyeInvisible size={20} onClick={handelhide} />
                  </div>
                ) : (
                  <div className="hideicon">
                    {" "}
                    <CgEyeAlt size={20} onClick={handelhide} />
                  </div>
                )}
              </div>

              <div className="modal_footer">
                <button onClick={handleEmailLogIn} className="submit_btn">
                  {"Login"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
