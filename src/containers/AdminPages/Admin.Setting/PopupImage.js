import React, { useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import { Notification } from "../../../components/ToastNotification";
import { useAddPopupImageMutation, useGetPopupImageQuery } from "../../../Services/Setting";


const PopupImagePage = () => {
  const [data, setData] = useState({
    proof: "",
  });

//   get image
const {data: popupImage} = useGetPopupImageQuery();

  const [addPopupImage, { data: response, error, isLoading }] =
    useAddPopupImageMutation();

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
      document.getElementById("proof").value = ""; // file input field reset
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", data.proof);
    if (!data.proof) {
      Notification("All field are required", "error");
    } else {
      await addPopupImage(formData);
    }
  };

  return (
    <div className="ss-trade_supportticket_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_supporttickett_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Popup Image</h2>
          {/* <p>Whenever, </p> */}
        </div>
        <div className="ss-trade_supportticket_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="purpose">
                <Input
                  label="Image"
                  type="file"
                  name="proof"
                  id="proof"
                  placeholder="Enter your image"
                  onChange={(e) =>
                    setData({ ...data, proof: e.target.files[0] })
                  }
                  className="input_field"
                  inputGroupClass="left"
                />
              </div>
            </div>
            <div
              className="form_group preview_image"
              style={{ display: "inherit" }}
            >
              <div className="img_preview">
                <img src={popupImage?.avatar} className="popupimage" alt="Popup_image" />
              </div>
            </div>
            <Button
              type="submit"
              className="submit_btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "submit"}
            </Button>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default PopupImagePage;
