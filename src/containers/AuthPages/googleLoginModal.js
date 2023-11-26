import React, { useState, useEffect } from "react";
import "../../styles/containers/AuthPage/googleloginform.scss";
import { GoAlert } from "react-icons/go";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import {
  useGetValidateMobileQuery,
  useAddGoogleLoginMutation,
} from "../../Services/userApi";

const GoogleLoginModal = ({
  handleGoogleLogin,
  handleOnChange,
  openModal,
  setOpenModal,
  value,
  setValue,
  isSponsorId,
  loading,
}) => {
  const [mobile, setMobile] = useState("");
  const [merror, setMerror] = useState("");
  const [defCountry, setDefCountry] = useState("IN"); // Set the default country code to "IN" initially
  const [country, setCountry] = useState(en[defCountry]);

  useEffect(() => {
    setValue({
      ...value,
      mobile,
      country,
    });

    // Cleanup function to reset the value when the component unmounts
    return () => {
      setValue({
        mobile: "",
        country: "",
      });
    };
  }, [mobile, country, setValue]); // Include all relevant dependencies

  // mobile validate
  const { data: mobileData, error: mobileError } =
    useGetValidateMobileQuery(mobile);

  useEffect(() => {
    if (mobileData?.message || mobileError?.data?.message) {
      setMerror(mobileData?.message || mobileError?.data?.message);
    }
  }, [mobileData, mobileError]);

  const handlePhoneChange = (newMobile) => {
    setMobile(newMobile);
  };

  const phoneError =
    mobile && !isValidPhoneNumber(mobile)
      ? "Invalid phone number"
      : mobile
      ? ""
      : "Phone number is required";

  return (
    <>
      <div className="googleloginmodal_wrapper">
        <form onSubmit={handleGoogleLogin}>
          <div className="modal_header">
            <div className="modal_title">
              <h2>Additional Information</h2>
              <span onClick={() => setOpenModal(false)}>X</span>
            </div>
          </div>
          <div className="modal_body">
            <div className="form_group">
              <label htmlFor="sponsorid">
                Sponsor Id <span>*</span>
              </label>
              <input
                type="text"
                name="sponsorid"
                onChange={handleOnChange}
                placeholder="Enter sponsor id"
                disabled={isSponsorId}
                value={value.sponsorid || ""}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="firstname">
                First Name <span>*</span>
              </label>
              <input
                type="text"
                name="first_name"
                onChange={handleOnChange}
                placeholder="Enter your first name"
                value={value.first_name || ""}
                required
              />
            </div>
            <div className="form_group">
              <label htmlFor="lastname">
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                name="last_name"
                onChange={handleOnChange}
                placeholder="Enter your last name"
                value={value.last_name || ""}
                required
              />
            </div>
            <div
              className="form_group"
              style={{ textTransform: "capitalize !important" }}
            >
              <label htmlFor="phone-input">
                Mobile <span style={{ color: "red" }}>*</span>
              </label>
              <PhoneInput
                international
                defaultCountry={defCountry}
                countryCallingCodeEditable={false}
                onCountryChange={(e) => setCountry(en[e])}
                placeholder="Enter Your Phone Number"
                value={mobile}
                onChange={handlePhoneChange}
                name="mobile"
                flags={false}
                error={phoneError}
                style={{
                  border: "100px solid #b1b7c1",
                  width: "100%",
                  padding: "6px 0",
                  borderRadius: "0 3px 3px 0",
                }}
              />
              <p style={{ fontSize: "13px", width: "100%" }}>
                {phoneError && (
                  <span style={{ color: "red" }}>{phoneError}</span>
                )}
              </p>
              {!phoneError && (
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
            </div>
          </div>
          <div className="modal_footer">
            <button
              type="submit"
              className="submit_btn"
              disabled={loading ? true : false}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
          <div className="alert_p">
            <p>
              <span>
                <GoAlert />
              </span>
              If You Don't Submit Your Additional Information, Then You Won't Be
              Registered User
            </p>
          </div>
        </form>
      </div>
      {openModal && (
        <div
          className="backdrop__effect"
          onClick={() => setOpenModal(false)}
        ></div>
      )}
    </>
  );
};

export default GoogleLoginModal;
