// import { color } from "@mui/system";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading/Loading";
import { Notification } from "../../../components/ToastNotification";
import {
  useEditUserMutation,
  useGetLoginUserQuery,
} from "../../../Services/userApi";

const UpdateProfile = () => {
  const { data: userData, isLoading:isLoadingUserData } = useGetLoginUserQuery();
  const [data, setData] = useState({
    sponsorId: userData?.data?.sponsorId,
    sponsorName: userData?.data?.sponsorName,
    userId: userData?.data?.userId,
    fullName: userData?.data?.fullName,
    mobile: userData?.data?.mobile,
    gender: userData?.data?.gender,
    country: userData?.data?.country,
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // edit profile
  const [editProfile, { error, data: userProfile, isLoading }] =
    useEditUserMutation();

  useEffect(() => {
    if (userProfile?.message) {
      Notification(userProfile?.message, "success");
    } else {
      Notification(error?.userProfile?.message, "error");
    }
  }, [error, userProfile]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(data);
  };

  if (isLoadingUserData) {
    return <Loading />;
  }
  return (
    <div className="ss-trade_userUpdate_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_userupdate_card"
      >
        <div className="ss-trade_userupdate_title">
          <h2>update profile</h2>
        </div>
        <div className="ss-trade_userupdate_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Sponsor ID"
                type="text"
                value={data.sponsorId}
                name="sponsorId"
                onChange={handleChange}
                inputGroupClass="left"
                disabled={true}
              />
              <Input
                label="Userid"
                type="text"
                value={data.userId}
                name="userId"
                onChange={handleChange}
                inputGroupClass="right"
                disabled={true}
              />
            </div>
            <div className="form_group">
              <Input
                label="Mobile"
                type="text"
                value={data.mobile}
                name="mobile"
                onChange={handleChange}
                inputGroupClass="left"
              />
              <Input
                label="Name"
                type="text"
                value={data.fullName}
                name="fullName"
                onChange={handleChange}
                inputGroupClass="right"
              />
            </div>
            <div className="form_group"></div>
            <div className="submit_button">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default UpdateProfile;
