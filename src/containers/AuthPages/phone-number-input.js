import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = () => {
  const [mobile, setMobile] = useState();

  return (
    <div>
      <label htmlFor="phone-input">
        Mobile <span style={{ color: "red" }}>*</span>
      </label>
      <PhoneInput
        name="mobile"
        value={mobile}
        onChange={setMobile}
        defaultCountry="IN"
        id="phone-input"
      />
    </div>
  );
};

export default PhoneNumberInput;
