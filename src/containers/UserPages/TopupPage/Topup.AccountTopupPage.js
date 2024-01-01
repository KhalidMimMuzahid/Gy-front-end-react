import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { topupAccountValidate } from "../../../components/Validation/vaildate";
import { useGetLoginUserQuery } from "../../../Services/userApi";
import {
  useGetAllWalletQuery,
  useTopupApiPackageMutation,
} from "../../../Services/walletApi";

const AccountTopupPage = () => {
  const { data: userData } = useGetLoginUserQuery();
  const userStatus = userData?.data?.isActive;
  const { data: allWalletInfo } = useGetAllWalletQuery();
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    user_id: userData?.data?.userId,
    serialNo: "",
  });
  // error
  useEffect(() => {
    setFormErrors(topupAccountValidate(data));
  }, [data]);
  // add topup
  const [addTopup, { data: topupData, error, isLoading }] =
    useTopupApiPackageMutation();

  useEffect(() => {
    if (topupData?.message) {
      Notification(topupData?.message, "success");
      setData({
        serialNo: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, topupData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      const topData = {
        packageAmount: Number(data.serialNo),
      };
      await addTopup(topData);
    }
  };



  return (
    <div className="ss-trade_topupaccount_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_topupaccount_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>{userStatus ? "Upgrade" : "Topup"} Account</h2>
          <div className="ss-trade_section_title_right_side">
            <div className="ss-trade_section_title_balance">
              <p>
                Self Investment:{" "}
                {`₹ ${
                  userData?.data?.packageInfo
                    ? userData?.data?.packageInfo?.amount
                    : "0"
                }`}
              </p>
              <p>
                {`₹ ${
                  allWalletInfo?.data
                    ? parseFloat(
                        allWalletInfo?.data?.depositBalance +
                          allWalletInfo?.data?.withdrawalBallance
                      ).toFixed(4)
                    : "0"
                }`}
              </p>
            </div>
          </div>
        </div>
        <div className="ss-trade_topupaccount_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="User ID"
                type="text"
                name="user_id"
                placeholder="Enter your user id"
                value={data.user_id}
                className="input_field"
                inputGroupClass="left"
                disabled={true}
                isRequired={true}
              />
              <Input
                label="Package"
                type="text"
                name="packageAmount"
                placeholder="Enter package amount"
                className="input_field"
                inputGroupClass="left"
                onChange={(e) => setData({ ...data, serialNo: e.target.value })}
                disabled={false}
                isRequired={true}
              />
            </div>
            {
              <Button type="submit" className="submit_btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Topup"}
              </Button>
            }
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default AccountTopupPage;
