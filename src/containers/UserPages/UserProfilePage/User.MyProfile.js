import React, { useEffect } from "react";
import avatar from "../../../assets/avatar.png";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import InputWithClipBoard from "../../../components/Input/InputWithClipBoard";
import Loading from "../../../components/Loading/Loading";
import { Notification } from "../../../components/ToastNotification";
import {
  useEditImageMutation,
  useGetLoginUserQuery,
} from "../../../Services/userApi";
import {} from "../../../Services/walletApi";

const MyProfile = () => {
  const { data, isLoading: isLoadingUserinfo } = useGetLoginUserQuery();
  // edit profile
  const [uploadImage, { error, data: user, isLoading }] =
    useEditImageMutation();
  useEffect(() => {
    if (user?.message) {
      Notification(user?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, user]);
  const handleChange = async (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    await uploadImage(formData);
  };
  if (isLoadingUserinfo) {
    return <Loading />;
  }

  return (
    <div className='ss-trade_my_profile_page_wrapper'>
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className='ss-trade_my_profile_card'
      >
        <div className='ss-trade_section_title'>
          <h2>profile</h2>
        </div>
        <div className='ss-trade_profile_head'>
          <div className='ss-trade_photo_content'>
            <div className='ss-trade_cover_photo'></div>
          </div>
          <div className='ss-trade_profile_short_info'>
            <div className='ss-trade_profile_photo'>
              <img
                src={data?.data?.avatar ? data?.data?.avatar : avatar}
                width='100%'
                alt='img'
              />

              {isLoading && "Uploading..."}
              <form encType='multipart/form-data'>
                <div className='form-check form-check-label'>
                  <label htmlFor='img' className='form-check-label'>
                    <Input
                      type='file'
                      name='image'
                      className='form-check-label'
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </form>
            </div>
            <div className='ss-trade_profile_info'>
              <div className='ss-trade_profile_name'>
                <h2>{data?.data?.fullName}</h2>
                <p>{data?.data?.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div className='ss-trade_profile_email'>
                <h2>{data?.data?.email}</h2>
                <p>Email</p>
              </div>
            </div>
          </div>
        </div>
        <div className='ss-trade_profile_bottom'>
          <div className='ss-trade_profile_title'>
            <h2>Profile Info details</h2>
          </div>
          <div className='ss-trade_profile_field'>
            <div className='form_group'>
              <Input
                label='User ID'
                type='text'
                value={data?.data?.userId}
                disabled={true}
                inputGroupClass='left'
              />
              <Input
                label='Name'
                type='text'
                value={data?.data?.fullName}
                disabled={true}
                inputGroupClass='right'
              />
            </div>
            <div className='form_group'>
              <Input
                label='Package(₹)'
                type='text'
                value={data?.data?.packageInfo?.amount}
                disabled={true}
                inputGroupClass='left'
              />
              <Input
                label='Sponsor ID'
                type='text'
                value={data?.data?.sponsorId}
                disabled={true}
                inputGroupClass='right'
              />
            </div>
            <div className='form_group'>
              <Input
                label='Email'
                type='text'
                value={data?.data?.email}
                disabled={true}
                inputGroupClass='left'
              />
              <Input
                label='Phone No.'
                type='text'
                value={data?.data?.mobile}
                disabled={true}
                inputGroupClass='right'
              />
            </div>
            <div className='form_group'>
              <Input
                label='Join Date'
                type='text'
                value={data?.data?.joiningDate}
                disabled={true}
                inputGroupClass='left'
              />

              <Input
                label='Activation Date'
                type='text'
                value={data?.data?.activationDate}
                disabled={true}
                inputGroupClass='right'
              />
            </div>
            <div className='form_group'>
              <InputWithClipBoard
                label='Your Referral Link'
                type='text'
                value={`${window.location.origin}/register?sponsorid=${data?.data?.userId}`}
                disabled={true}
                inputGroupClass='left'
                copyToClipboard={true}
                visibility='visible'
                style={{
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default MyProfile;
