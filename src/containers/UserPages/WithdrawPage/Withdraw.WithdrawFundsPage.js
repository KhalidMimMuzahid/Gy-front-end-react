import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { withdrawAmountValidate } from "../../../components/Validation/vaildate";
import { useGetLoginUserQuery, useGetSuccessKycQuery, useGetUserBankDetailQuery } from "../../../Services/userApi";
import {
  useAddWithdrawFundsMutation,
  useGetAllWalletQuery,
} from "../../../Services/walletApi";
import Select from "../../../components/Select";
import{AiFillWarning} from "react-icons/ai";

const WithdrawPage = () => {
  const { data: userData } = useGetLoginUserQuery();
  const { data: userBank } = useGetUserBankDetailQuery();
  const { data: SuccessKyc } = useGetSuccessKycQuery();
  const { data: allWalletInfo } = useGetAllWalletQuery();

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [accountNumber, setAccountNumber] = useState(userBank?.banks[0]?.accountNumber || "");

  const [data, setData] = useState({
    amount: "",
    accountNumber: accountNumber || 0,
    withdrawType: "",
  });

  useEffect(() => {
    setFormErrors(withdrawAmountValidate(data));
  }, [data]);

  useEffect(() => {
    if (userBank) {
      const newAccountNumber = userBank?.banks[0]?.accountNumber;
      setAccountNumber(newAccountNumber);
      // Update data.accountNumber to match the new account number
      setData((prevData) => ({
        ...prevData,
        accountNumber: newAccountNumber || 0,
      }));
    }
  }, [userBank]);


  useEffect(() => {
    setFormErrors(withdrawAmountValidate(data));
  }, [data]);
  const [addWithdraw, { error, data: withdrawData, isLoading }] =
    useAddWithdrawFundsMutation();


    useEffect(()=>{
      if(SuccessKyc){
        setMessage(SuccessKyc?.data)
      }
     
    },[SuccessKyc])
  useEffect(() => {
    if (withdrawData?.message) {
      Notification(withdrawData?.message, "success");
      setData({
        amount: "",
        withdrawType: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, withdrawData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      const obj = {
        ...data,
        user_id: data.user_id,
      };
      if (data.amount < 0) {
        Notification("Negative amount is not allow", "error");
      } else {
        await addWithdraw(obj);
      }
    }
  };
  return (
    <div className="ss-trade_topupaccount_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_topupaccount_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Withdraw</h2>
          <div className="ss-trade_section_title_right_side">
            <div
              className="ss-trade_section_title_balance ss-trade_section_Trx_balance"
              style={{ gap: "5px" }}
            >
              <p>
              Self Investment: ₹
                {allWalletInfo?.data?.investmentAmount
                  ? parseFloat(allWalletInfo?.data?.investmentAmount).toFixed(4)
                  : "0"}
              </p>
              <p style={{ marginLeft: "10px !important" }}>
              ₹ {allWalletInfo?.data?.activeIncome
                  ? parseFloat(allWalletInfo?.data?.activeIncome).toFixed(4)
                  : "0"}
              </p>
            </div>
          </div>
        </div>
        <div className="ss-trade_topupaccount_page_content">
          { !message &&
              <div className="warning_message">
              <AiFillWarning/>
              <h5>Please complete your KYC before initiating a withdrawal</h5>
              </div>
          }
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="package" style={{ marginRight: "5px" }}>
                <Select
                  label="Withdraw Type"
                  name="withdrawType"
                  value={data.withdrawType}
                  options={["investment", "profit"]}
                  placeholder="Enter your USDT address"
                  onChange={(e) =>
                    setData({ ...data, withdrawType: e.target.value })
                  }
                  className="input_field"
                  inputGroupClass="right"
                  isRequired={true}
                />
              </div>
              <Input
                label="Amount"
                type="number"
                name="amount"
                value={data.amount}
                placeholder="Enter your amount"
                onChange={(e) => setData({ ...data, amount: e.target.value })}
                className="input_field"
                inputGroupClass="left amount_field"
                isRequired={true}
                error={
                  data?.amount && data?.amount < 1
                    ? "Minimum withdraw amount is 1 USDT."
                    : ""
                }
              />
              <Input
                label="Account Number"
                type="text"
                name="accountNumber"
                value={data.accountNumber}
                placeholder="Enter your Account Number"
                onChange={(e) =>
                  setData({ ...data, accountNumber: e.target.value })
                }
                className="input_field"
                inputGroupClass="right"
                isRequired={true}
                // disabled={true}
                // style={{ cursor: "no-drop" }}
              />
            </div>

            <Button
              type="submit"
              className="submit_btn"
              disabled={isLoading || data?.amount < 1 || !message}
            >
              {isLoading ? "Loading..." : "Withdraw"}
            </Button>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default WithdrawPage;
