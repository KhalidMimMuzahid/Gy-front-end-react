import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import { Notification } from "../../../components/ToastNotification";
import { RoyaltyTransferValidate } from "../../../components/Validation/vaildate";
import {
  useAddSendRoyaltyMembersMoneyAdminMutation,
  useGetRoyaltyMembersAdminQuery,
} from "../../../Services/earningApi";
import { useGetLoginUserQuery } from "../../../Services/userApi";

const RoyaltyIncome = () => {
  const { data: userData } = useGetLoginUserQuery();
  const { data: GetRoyaltyMemberData } = useGetRoyaltyMembersAdminQuery();
  const [
    addSendRoyaltyMember,
    { data: RoyaltyMemberResponse, isLoading, error },
  ] = useAddSendRoyaltyMembersMoneyAdminMutation();

  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    amount: "",
    remark: "",
  });
  // // error
  useEffect(() => {
    setFormErrors(RoyaltyTransferValidate(data));
  }, [data]);
  useEffect(() => {
    if (RoyaltyMemberResponse?.message) {
      Notification(RoyaltyMemberResponse?.message, "success");
      setData({
        amount: "",
        remark: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, RoyaltyMemberResponse]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      const dataU = {
        ...data,
      };
      if (dataU.amount < 0) {
        Notification("Negative amount is not allow", "error");
      } else {
        await addSendRoyaltyMember(dataU);
      }
    }
  };
  return (
    <div className="ss-trade_royalty_page_wrapper">
      {" "}
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_royalty_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Royalty Income</h2>
        </div>
        <div className="ss-trade_royalty_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group" style={{ display: "inherit" }}>
              <Select
                label="View User List"
                className="select_field"
                value={data.amount_type}
                name="amount_type"
                // onChange={handleChangeIncomeType}
                options={GetRoyaltyMemberData ? GetRoyaltyMemberData : []}
                isRequired={false}
                // disabled={true}
                autoComplete="off"
              />
            </div>
            <div className="form_group">
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
              />
            </div>
            {/* <div
              className="form_group text_area"
              style={{ display: "inherit" }}
            >
              <TextArea
                label="Remark"
                name="remark"
                id="remark"
                cols="30"
                rows="10"
                onChange={(e) => setData({ ...data, remark: e.target.value })}
                value={data?.remark}
                isRequired={true}
                placeholder="Write Your Message..."
              />
            </div> */}
            <Button type="submit" className="submit_btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "royalty Transfer"}
            </Button>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default RoyaltyIncome;
