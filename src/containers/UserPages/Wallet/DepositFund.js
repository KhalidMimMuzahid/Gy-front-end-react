import React, { useEffect, useRef, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import bnb from "../../../assets/bnb.jpg";
import trx from "../../../assets/trx.jpg";
import { Notification } from "../../../components/ToastNotification";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { depositAmountValidate } from "../../../components/Validation/vaildate";
import {
  useAddDepositFundMutation,
  useGetAllWalletQuery,
} from "../../../Services/walletApi";
import { useGetLoginUserQuery } from "../../../Services/userApi";
import PuiImage from "../../../../src/assets/PUI.png";
const DepositFundPage = () => {
  const { data: allWalletInfo } = useGetAllWalletQuery();
  const { data: userData } = useGetLoginUserQuery();
  const [formErrors, setFormErrors] = useState({}); // form errors
  const inputRef = useRef(null);
  const [value, setValue] = useState({
    user_id: userData?.data?.userId,
    amount: "",
    hash: "",
    proof: "",
  });
  // error
  useEffect(() => {
    setFormErrors(depositAmountValidate(value));
  }, [value]);
  const [addDeposit, { data: depositData, error, isLoading }] =
    useAddDepositFundMutation();
  useEffect(() => {
    if (depositData?.message) {
      Notification(depositData?.message, "success");
      setValue({
        amount: "",
        hash: "",
        proof: "",
      });
      document.getElementById("proof").value = ""; // reset file input field
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, depositData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", value.proof);
    formData.append("user_id", value.user_id);
    formData.append("amount", value.amount);
    formData.append("hash", value.hash);
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      if (value.amount < 0) {
        Notification("Negative amount is not allow", "error");
      }
      //  else if (value?.amount < 500) {
      //   Notification("Minimum deposit is 500", "error");
      // }
      else {
        await addDeposit(formData);
      }
    }
  };

  // copy wallet address
  const [inputVal, setInputVal] = useState({
    bnb: "0xfafc63977c4e506c427f05439118ecc4b578a295",
    trx: "TNttwoaNs2vLwV9qfH7PLZUxibYJWM9enj",
  });
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputVal.trx);
    Notification("Text copied", "success");
  };
  const copyToClipboardbnb = () => {
    navigator.clipboard.writeText(inputVal.bnb);
    Notification("Text copied", "success");
  };
  useEffect(() => {
    setInputVal({
      bnb: "0xfafc63977c4e506c427f05439118ecc4b578a295",
      trx: "TNttwoaNs2vLwV9qfH7PLZUxibYJWM9enj",
    });
  }, []);
  return (
    <>
      <div className="ss-trade_topupaccount_page_wrapper">
        <CardLayout
          style={{ backgroundColor: "#fff" }}
          className="ss-trade_topupaccount_form_card"
        >
          <div className="ss-trade_section_title">
            <h2>Deposit Fund</h2>
            <div className="ss-trade_section_title_right_side">
              <div className="ss-trade_section_title_balance ss-trade_section_Trx_balance">
                <p>
                  ₹{" "}
                  {allWalletInfo?.data?.depositBalance
                    ? parseFloat(allWalletInfo?.data?.depositBalance).toFixed(4)
                    : "0"}
                </p>
              </div>
            </div>
          </div>
          <div className="ss-trade_topupaccount_page_content">
            <div className="ss-trade_topup_qr_content">
              {/* bnb */}
              <div className="qr_code_box">
                <div className="card">
                  <div>
                    <h2>Bank Name : ICICI Bank</h2>
                    <h3>Account Name : 3W Business Private Limited</h3>
                    <h3>Account : 025405006735</h3>
                    <h3>IFSC Code : ICIC0000254</h3>
                  </div>
                </div>
              </div>
              <div className="qr_code_box">
                <div className="card2">
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <a href="upi://pay?pa=3wbusinessprivatelimited@icici&cu=INR&tn=Grow More">
                      {" "}
                      PAY Via
                    </a>
                    <img
                      src={PuiImage}
                      style={{ height: "60px", width: "70px" }}
                    />
                  </div>
                </div>
              </div>
              {/* trx */}
              {/* <div className="qr_code_box">
                <div className="qr_img">
                  <img src={trx} alt="qr" />
                </div>
                <div className="qr_address">
                  <Input
                    label="TRC20 Address"
                    type="text"
                    value={inputVal.trx}
                    className="input_field"
                    disabled={true}
                    inputGroupClass="left"
                  />
                  <span style={{ marginTop: "-5px" }} onClick={copyToClipboard}>
                    <MdOutlineContentCopy />
                  </span>
                </div>
                <div className="disclaimer">
                  <div className="dis_alert">
                    <span>
                      <IoIosAlert />
                    </span>
                    <span>Disclaimer</span>
                  </div>
                  <ul>
                    <li>Send only USDT to this deposit address.</li>
                    <li>
                      This address does not support deposit of non-fungible
                      token, please go to NFT page to deposit NFT.
                    </li>
                    <li>Kindly send your USDT include tax.</li>
                    <li>Network allowance only BNB Smart Chain(TRC20).</li>
                  </ul>
                </div>
              </div> */}
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form_group">
                <Input
                  label="User ID"
                  type="text"
                  name="user_id"
                  placeholder="Enter your user id"
                  className="input_field"
                  value={value.user_id}
                  inputGroupClass="left"
                  disabled={true}
                  isRequired={true}
                />
                <Input
                  label="Amount"
                  type="number"
                  name="amount"
                  placeholder="Enter your amount"
                  onChange={(e) =>
                    setValue({ ...value, amount: e.target.value })
                  }
                  value={value.amount}
                  className="input_field amount_input_field"
                  inputGroupClass="right amount_field"
                  isRequired={true}
                />
              </div>
              <div className="form_group">
                <Input
                  label="Proof"
                  type="file"
                  name="proof"
                  placeholder="Enter your proof"
                  onChange={(e) =>
                    setValue({ ...value, proof: e.target.files[0] })
                  }
                  className="input_field"
                  id="proof"
                  ref={inputRef}
                  inputGroupClass="left"
                  isRequired={true}
                />
                <Input
                  label="Transaction ID"
                  type="text"
                  name="hash"
                  placeholder="Enter your transaction ID"
                  onChange={(e) => setValue({ ...value, hash: e.target.value })}
                  value={value.hash}
                  className="input_field"
                  inputGroupClass="right"
                />
              </div>
              <Button type="submit" className="submit_btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Deposit"}
              </Button>
            </form>
          </div>
        </CardLayout>
      </div>
    </>
  );
};

export default DepositFundPage;
