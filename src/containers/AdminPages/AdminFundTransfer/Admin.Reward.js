import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import Button from "../../../components/Button";
import {
  useAddRewardMutation,
  useDeleteRewardMutation,
  useGetAdminRewardQuery,
} from "../../../Services/Setting";
import { Notification } from "../../../components/ToastNotification";
import Input from "../../../components/Input";

const AdminReward = () => {
  const [data, setData] = useState({
    images: [],
  });
  // Get reward
  const { data: getReward } = useGetAdminRewardQuery();

  // Add/Update Reward
  const [addReward, { data: response, error, isLoading }] =
    useAddRewardMutation();

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
      setData({ ...data, images: [] });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);

  const handleSubmit = async (id) => {
    let formData = new FormData();
    id?._id && formData.append("id", id?._id);
    for (let i = 0; i < data?.images?.length; i++) {
      formData.append("image", data?.images[i]);
    }
    if (data?.images?.length < 0) {
      Notification("All field are required", "error");
    } else {
      await addReward(formData);
    }
  };
  // Add/Update Reward
  const [deleteReward, { data: DelResponse, error: delErr }] =
    useDeleteRewardMutation();

  useEffect(() => {
    if (DelResponse?.message) {
      Notification(DelResponse?.message, "success");
    } else {
      Notification(delErr?.data?.message, "error");
    }
  }, [delErr, DelResponse]);
  const handleDelete = async (reward) => {
    const obj = {
      id: reward?._id,
      publicId: reward?.image?.publicId,
    };
    await deleteReward(obj);
  };
  return (
    <div className="ss-trade_supportticket_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_supporttickett_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Send Reward</h2>
        </div>
        <div className="ss-trade_supportticket_page_content">
          <form className="form">
            <div className="sst_images_upload_boxes_container">
              <div className="sst_image_upload_box">
                <div className="form_group">
                  <div className="purpose">
                    <Input
                      label="Image"
                      type="file"
                      name="proof"
                      id="proof"
                      placeholder="Enter your image"
                      onChange={(e) => {
                        setData({
                          ...data,
                          images: [...data.images, e.target.files[0]],
                        });
                      }}
                      className="input_field"
                      inputGroupClass="left"
                    />
                  </div>
                  {getReward?.length > 0 && getReward[0] && (
                    <div
                      className="preview_image"
                      style={{ display: "inherit" }}
                    >
                      <div className="img_preview">
                        <img
                          src={getReward[0]?.image?.url}
                          className="popupimage"
                          alt="Popup_image"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    className="submit_btn"
                    disabled={isLoading || delErr ? true : false}
                    onClick={() => handleSubmit(getReward[0])}
                  >
                    {isLoading || delErr ? "Loading..." : "submit"}
                  </Button>
                  <Button
                    type="button"
                    className="delete_btn"
                    disabled={isLoading || delErr ? true : false}
                    onClick={() => handleDelete(getReward[0])}
                  >
                    {isLoading || delErr ? "Loading..." : "Remove"}
                  </Button>
                </div>
              </div>
              <div className="sst_image_upload_box">
                <div className="form_group">
                  <div className="purpose">
                    <Input
                      label="Image"
                      type="file"
                      name="proof"
                      id="proof"
                      placeholder="Enter your image"
                      onChange={(e) => {
                        setData({
                          ...data,
                          images: [...data.images, e.target.files[0]],
                        });
                      }}
                      className="input_field"
                      inputGroupClass="left"
                    />
                  </div>
                  {getReward?.length > 0 && getReward[1] && (
                    <div
                      className="preview_image"
                      style={{ display: "inherit" }}
                    >
                      <div className="img_preview">
                        <img
                          src={getReward[1]?.image?.url}
                          className="popupimage"
                          alt="Popup_image"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    className="submit_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleSubmit(getReward[1])}
                  >
                    {isLoading ? "Loading..." : "submit"}
                  </Button>
                  <Button
                    type="button"
                    className="delete_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleDelete(getReward[1])}
                  >
                    {isLoading ? "Loading..." : "Remove"}
                  </Button>
                </div>
              </div>
              <div className="sst_image_upload_box">
                <div className="form_group">
                  <div className="purpose">
                    <Input
                      label="Image"
                      type="file"
                      name="proof"
                      id="proof"
                      placeholder="Enter your image"
                      onChange={(e) => {
                        setData({
                          ...data,
                          images: [...data.images, e.target.files[0]],
                        });
                      }}
                      className="input_field"
                      inputGroupClass="left"
                    />
                  </div>
                  {getReward?.length > 0 && getReward[2] && (
                    <div
                      className="preview_image"
                      style={{ display: "inherit" }}
                    >
                      <div className="img_preview">
                        <img
                          src={getReward[2]?.image?.url}
                          className="popupimage"
                          alt="Popup_image"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    className="submit_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleSubmit(getReward[2])}
                  >
                    {isLoading ? "Loading..." : "submit"}
                  </Button>
                  <Button
                    type="button"
                    className="delete_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleDelete(getReward[2])}
                  >
                    {isLoading ? "Loading..." : "Remove"}
                  </Button>
                </div>
              </div>
              <div className="sst_image_upload_box">
                <div className="form_group">
                  <div className="purpose">
                    <Input
                      label="Image"
                      type="file"
                      name="proof"
                      id="proof"
                      placeholder="Enter your image"
                      onChange={(e) => {
                        setData({
                          ...data,
                          images: [...data.images, e.target.files[0]],
                        });
                      }}
                      className="input_field"
                      inputGroupClass="left"
                    />
                  </div>
                  {getReward?.length > 0 && getReward[3] && (
                    <div
                      className="preview_image"
                      style={{ display: "inherit" }}
                    >
                      <div className="img_preview">
                        <img
                          src={getReward[3]?.image?.url}
                          className="popupimage"
                          alt="Popup_image"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    className="submit_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleSubmit(getReward[3])}
                  >
                    {isLoading ? "Loading..." : "submit"}
                  </Button>
                  <Button
                    type="button"
                    className="delete_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleDelete(getReward[3])}
                  >
                    {isLoading ? "Loading..." : "Remove"}
                  </Button>
                </div>
              </div>
              <div className="sst_image_upload_box">
                <div className="form_group">
                  <div className="purpose">
                    <Input
                      label="Image"
                      type="file"
                      name="proof"
                      id="proof"
                      placeholder="Enter your image"
                      onChange={(e) => {
                        setData({
                          ...data,
                          images: [...data.images, e.target.files[0]],
                        });
                      }}
                      className="input_field"
                      inputGroupClass="left"
                    />
                  </div>
                  {getReward?.length > 0 && getReward[4] && (
                    <div
                      className="preview_image"
                      style={{ display: "inherit" }}
                    >
                      <div className="img_preview">
                        <img
                          src={getReward[4]?.image?.url}
                          className="popupimage"
                          alt="Popup_image"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    className="submit_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleSubmit(getReward[4])}
                  >
                    {isLoading ? "Loading..." : "submit"}
                  </Button>
                  <Button
                    type="button"
                    className="delete_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleDelete(getReward[4])}
                  >
                    {isLoading ? "Loading..." : "Remove"}
                  </Button>
                </div>
              </div>
              <div className="sst_image_upload_box">
                <div className="form_group">
                  <div className="purpose">
                    <Input
                      label="Image"
                      type="file"
                      name="proof"
                      id="proof"
                      placeholder="Enter your image"
                      onChange={(e) => {
                        setData({
                          ...data,
                          images: [...data.images, e.target.files[0]],
                        });
                      }}
                      className="input_field"
                      inputGroupClass="left"
                    />
                  </div>
                  {getReward?.length > 0 && getReward[5] && (
                    <div
                      className="preview_image"
                      style={{ display: "inherit" }}
                    >
                      <div className="img_preview">
                        <img
                          src={getReward[5]?.image?.url}
                          className="popupimage"
                          alt="Popup_image"
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    className="submit_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleSubmit(getReward[5])}
                  >
                    {isLoading ? "Loading..." : "submit"}
                  </Button>
                  <Button
                    type="button"
                    className="delete_btn"
                    disabled={isLoading ? true : false}
                    onClick={() => handleDelete(getReward[5])}
                  >
                    {isLoading ? "Loading..." : "Remove"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default AdminReward;
