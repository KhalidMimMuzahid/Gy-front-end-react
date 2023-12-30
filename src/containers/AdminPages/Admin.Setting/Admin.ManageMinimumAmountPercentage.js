import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import Button from "../../../components/Button";
import {
  useGetManageDataQuery,
  useUpdateMinDepositeAmountMutation,
  useUpdateMinWithdrawAmountMutation,
  useUpdateMinWithdrawPercentageAmountMutation,
} from "../../../Services/Setting";

const ManageMinimumAmountPercentage = () => {
  const [withdrawPercentage, setWithdrawPercentage] = useState("");
  const [minimumWithdrawAmount, setMinimumWithdrawAmount] = useState("");
  const [minimumDepositeAmount, setMinimumDepositeAmount] = useState("");
  const [DepositeAmount, setDepositeAmount] = useState("");
  const [withdrawAmount, setsWithdarwAmount] = useState("");
  const [percentage, setPercentage] = useState("");

  const [
    updateMinDepositeAmount,
    { data: updateDepositeData, error: depositeError, loading: depositLoading },
  ] = useUpdateMinDepositeAmountMutation();
  const [
    updateWithdrawAmount,
    { data: withdrawData, error: withdrawError, loading: withdrawLoading },
  ] = useUpdateMinWithdrawAmountMutation();
  const [
    updateMinWithdrawPercentageAmount,
    {
      data: withdrawPercentageData,
      error: withdrawPercentageError,
      loading: withdrawPercentageLoading,
    },
  ] = useUpdateMinWithdrawPercentageAmountMutation();
  const {data:manageAmount,} = useGetManageDataQuery()

useEffect(() => {
  if (manageAmount && manageAmount.message && manageAmount.message.length > 0) {
    const { minimumDepositAmount, minimumWithdrawAmount, withdrawPercentage } = manageAmount.message[0];

    if (minimumDepositAmount !== undefined) {
      setDepositeAmount(minimumDepositAmount);
      setsWithdarwAmount(minimumWithdrawAmount);
      setPercentage(withdrawPercentage);
    }  else {
      // If none of the properties are available, reset all states
      setWithdrawPercentage("");
      setMinimumWithdrawAmount("");
      setMinimumDepositeAmount("");
    }
  }
}, [manageAmount]);
//confromation for Withdraw parcentate Notificaion
  useEffect(() => {
    if (withdrawPercentageData?.message) {
      Notification(withdrawPercentageData?.message, "success");
      setWithdrawPercentage("");
    } else {
      Notification(withdrawPercentageError?.data?.message, "error");
    }
  }, [withdrawPercentageError, withdrawPercentageData]);

  //confromation for Minmum Withdraw Amount Notificaion
  useEffect(() => {
    if (updateDepositeData?.message) {
      Notification(updateDepositeData?.message, "success");
      setMinimumDepositeAmount("");
    } else {
      Notification(depositeError?.data?.message, "error");
    }
  }, [depositeError, updateDepositeData]);

  useEffect(() => {
    if (withdrawData?.message) {
      Notification(withdrawData?.message, "success");
      setMinimumDepositeAmount("");
    } else {
      Notification(withdrawError?.data?.message, "error");
    }
  }, [withdrawError, withdrawData]);
  const handleMinDeposite = async (e) => {
    e.preventDefault();
    // console.log(withdrawPercentage, minimumWithdrawAmount, minimumDepositeAmount)
    if (!minimumDepositeAmount) {
      Notification("Minmum Deposite Amount is Required", "error");
    } else {
      console.log({ minimumDepositeAmount });
      await updateMinDepositeAmount({ minimumDepositeAmount });
    }
  };
  const handleSubmitMinWithdraw = async (e) => {
    e.preventDefault();
    if (!minimumWithdrawAmount) {
      Notification("Minmum Withdraw Amount is Required", "error");
    } else {
      await updateWithdrawAmount({ minimumWithdrawAmount });
    }
  };
  const handleWithdrawPercentage = async (e) => {
    e.preventDefault();
    // console.log(withdrawPercentage, minimumWithdrawAmount, minimumDepositeAmount)
    if (!withdrawPercentage) {
      Notification("Minmum Withdraw Percentage Amount is Required", "error");
    } else {
      await updateMinWithdrawPercentageAmount({ withdrawPercentage });
    }
  };
  return (
    <div className="ss-trade_updatepassword_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_accountpassword_card"
      >
        <div className="ss-trade_accountpassword_title">
          <h2>Manage</h2>
        </div>
        <div className="ss-trade_accountpassword_field">
          <div>
          <form onSubmit={handleWithdrawPercentage}>
            <div className="form_group">
              <Input
                label="Mange Withdraw Percentage"
                type="number"
                name="new_email"
                value={withdrawPercentage}
                onChange={(e) => setWithdrawPercentage(e.target.value)}
                placeholder="Enter Mange Withdraw Percentage"
                inputGroupClass="right"
                isRequired={true}
              />
            </div>

            <div className="form_group">
              <Button type="submit" className="submit_btn" disabled ={withdrawPercentageLoading ? true : false}>
                {withdrawPercentageLoading ? "Loading" :"Update"}
              </Button>
            </div>
          </form>
          <form onSubmit={handleMinDeposite}>
            <div className="form_group">
              <Input
                label="Minimum Deposite Amount"
                type="text"
                disabl
                name=""
                value={minimumDepositeAmount}
                onChange={(e) => setMinimumDepositeAmount(e.target.value)}
                placeholder="Enter Mange Minimum Deposite Amount"
                inputGroupClass="right"
                isRequired={true}
              />
            </div>

            <div className="form_group">
              <Button
                type="submit"
                className="submit_btn"
                disabled={depositLoading ? true : false}
              >
                {depositLoading ? "Loading..." : "Update"}
              </Button>
            </div>
          </form>
          <form onSubmit={handleSubmitMinWithdraw}>
            <div className="form_group">
              <Input
                label="Minimum withdraw Amount"
                type="text"
                name=""
                value={minimumWithdrawAmount}
                onChange={(e) => setMinimumWithdrawAmount(e.target.value)}
                placeholder="Enter Mange Minimum withdraw Amount"
                inputGroupClass="right"
                isRequired={true}
              />
            </div>

            <div className="form_group">
              <Button
                type="submit"
                className="submit_btn"
                disabled={withdrawLoading ? true : false}
              >
                {withdrawLoading ? "Loading..." : "update"}
              </Button>
            </div>
          </form>
          </div>
          <div>
          <div style={{ border: "1px solid black", justifyContent: "center", padding: "10px", width: "450px" }}>
        <h1 style={{textAlign:"center"}}>Preview</h1>
        <div style={{  marginTop: "10px" }}>
          <h2>Minmum Withdraw Amount : {withdrawAmount}</h2>
          <h2>Minmum Deposite Amount : {DepositeAmount}</h2>
          <h2>Withdraw Percentage Amount : {percentage}%</h2>
          
        </div>
      </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default ManageMinimumAmountPercentage;
