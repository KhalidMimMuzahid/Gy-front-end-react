import React, { useState, useEffect } from "react";
import "../../styles/containers/AuthPage/googleloginform.scss";

// import { isValidPhoneNumber } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";


const GoogleLoginModal = ({
  handleGoogleLogin,
  handleOnChange,
  openModal,
  setOpenModal,
  value,
  setValue,
  isSponsorId,
  loading,
  handel,
  handelSponsore,
}) => {
  const [mobile, setMobile] = useState("");
  // const [merror, setMerror] = useState("");
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
                Sponsor Id <span></span>
              </label>
              <input
                type="text"
                name="sponsorid"
                onChange={handleOnChange}
                placeholder="Enter sponsor id"
                value={value.sponsorid || ""}
              />
            </div>

            <div
              className="form_group"
              style={{ textTransform: "capitalize !important" }}
            >
              {handelSponsore ? (
                <div className="sponsor_name">
                  <p> Your Sponsore Name:{handelSponsore}</p>
                </div>
              ) : handel ? (
                <div>
                  <p>Invalid Sponsore Id</p>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
          <div className="modal_footer">
            <button
              type="submit"
              className="submit_btn"
              disabled={!handel ? true : false}
            >
              {"Done"}
            </button>
            <button
              type="submit"
              className="submit_btn"
              disabled={handel ? true : false}
            >
              {"Skip"}
            </button>
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
