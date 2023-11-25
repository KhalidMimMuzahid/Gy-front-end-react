import React, { useEffect } from "react";
import CardLayout from "../../../components/CardLayout";
import Select from "../../../components/Select";
import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { Notification } from "../../../components/ToastNotification";
import { AiOutlineWarning } from "react-icons/ai";
import ViewKYC from "./User.ViewKyc";
import { useAddKycMutation } from "../../../Services/userApi";

const purpose = [
  "Aadhar Card",
  "Pan Card",
  "National ID",
  "Voter ID",
  "Driving License",
];
const AddKyc = () => {
  const [imageVerificationSize, setImageVerificationSize] = useState("");
  const [imageVerificationType,] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldIdentity, setFieldIdentity] = useState(0);
  const [frontSideImage, setFrontSideImage] = useState([]);
  const [backSideImage, setBackSideImage] = useState([]);
  const [chosenField, setChosenField] = useState({
    purpose: "",
  });

  const [uploadKYC, { data: kycResponseData, error: kycError}] = useAddKycMutation();

  // KYC option select
  const handleChange = (e) => {
    setChosenField(e.target.value);
    switch (e.target.value) {
      case "Aadhar Card":
        setFieldIdentity(1);
        break;
      case "Pan Card":
        setFieldIdentity(2);
        break;
      case "National ID":
        setFieldIdentity(3);
        break;
      case "Voter ID":
        setFieldIdentity(4);
        break;
      case "Driving License":
        setFieldIdentity(5);
        break;
      default:
        setFieldIdentity(0);
        break;
    }
  };

  const [cardInfoForUIOnly, setCardInfoForUIOnly] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        e.target?.name === "FrontSideImage" &&
          setCardInfoForUIOnly({
            ...cardInfoForUIOnly,
            [e.target.name]: reader.result,
          });
        e.target?.name === "FrontSideImage" &&
          setFrontSideImage(e.target.files[0]);
        e.target?.name === "BackSideImage" &&
          setCardInfoForUIOnly({
            ...cardInfoForUIOnly,
            [e.target.name]: reader.result,
          });
        e.target?.name === "BackSideImage" &&
          setBackSideImage(e.target.files[0]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !frontSideImage?.name ||
      !backSideImage?.name ||
      !cardInfoForUIOnly?.cardNumber
    ) {
      Notification("All fields are required", "error");
      setLoading(false);
    } else if (
      frontSideImage.size <= 15000000 &&
      backSideImage.size <= 15000000
    ) {
      const formdata = new FormData();
      formdata.append("file", frontSideImage);
      formdata.append("upload_preset", "rtc5xgrx");
      const { data: frontSide } = await axios.post(
        "https://api.cloudinary.com/v1_1/green-valley-grocery/upload",
        formdata
      );
      const formdata1 = new FormData();
      formdata1.append("file", backSideImage);
      formdata1.append("upload_preset", "rtc5xgrx");
      const { data: backSide } = await axios.post(
        "https://api.cloudinary.com/v1_1/green-valley-grocery/upload",
        formdata1
      );
      const newObj = {
        card_number: cardInfoForUIOnly?.cardNumber,
        front_side: frontSide.url,
        back_side: backSide.url,
        kyc_method: chosenField,
        submission_date : new Date().toString()
      };
      
      if (frontSide?.url && backSide?.url) {
        await uploadKYC(newObj);
        setLoading(false);
      } else {
        setLoading(false);
        Notification("Something Wrong! Please Try Again Later.", "error");
      }
    } else {
      setImageVerificationSize(" Maximum upload Image size 2MB", "error");
      setLoading(false);
      setWarningShow(true);
    }
  };

  const [warningShow, setWarningShow] = useState(false);
  const ImageWarning = () => {
    return (
      <>
        {warningShow && (
          <div className="image_verification">
            <AiOutlineWarning />
            <div>
              <p>{imageVerificationSize ? imageVerificationSize : ""}</p>
              <p>{imageVerificationType ? imageVerificationType : ""}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    if(kycResponseData?.message){
    Notification(kycResponseData?.message, "success");
    }
    if(kycError){
      Notification(kycError?.data?.message, "error");
    }
  }, [kycResponseData?.message, kycError]);

  useEffect(() => {
    setCardInfoForUIOnly({});
    setFrontSideImage([]);
    setBackSideImage([]);
  }, [fieldIdentity]);

  return (
    <div className="kyc_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff", height: "80%" }}
        className="kyc_form_card"
      >
        <div className="kyc_section_title" style={{ paddingTop: "10px" }}>
          <h2>KYC</h2>
        </div>

        <div className="kyc_page_content">
          <Select
            label="Choose Your Method"
            className="select_field"
            value={chosenField.purpose}
            name="purpose"
            onChange={handleChange}
            options={purpose}
            isRequired={true}
          />
        </div>
        {fieldIdentity === 1 && (
          <>
            <div className="kyc_page_content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="images_section">
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.FrontSideImage && (
                          <img src={cardInfoForUIOnly?.FrontSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Front Side(Max: 15MB)"
                      type="file"
                      name="FrontSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.BackSideImage && (
                          <img src={cardInfoForUIOnly?.BackSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Back Side(Max: 15MB)"
                      type="file"
                      name="BackSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                </div>

                {/* <div className="form_group"> */}
                <Input
                  label="Aadhar Card Number"
                  type="text"
                  name="cardNumber"
                  placeholder="Enter Aadhar Card Number"
                  onChange={(e) =>
                    setCardInfoForUIOnly({
                      ...cardInfoForUIOnly,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={cardInfoForUIOnly?.cardNumber}
                  className="input_field"
                  isRequired={true}
                />
                {/* </div> */}
                <Button type="submit" className="submit_btn">
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          </>
        )}
        {fieldIdentity === 2 && (
          <>
            <div className="kyc_page_content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="images_section">
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.FrontSideImage && (
                          <img src={cardInfoForUIOnly?.FrontSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Front Side(Max: 15MB)"
                      type="file"
                      name="FrontSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.BackSideImage && (
                          <img src={cardInfoForUIOnly?.BackSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Back Side(Max: 15MB)"
                      type="file"
                      name="BackSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                </div>

                <Input
                  label="Pan Card Number"
                  type="text"
                  name="cardNumber"
                  placeholder="Enter Pan Card Number"
                  onChange={(e) =>
                    setCardInfoForUIOnly({
                      ...cardInfoForUIOnly,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={cardInfoForUIOnly?.cardNumber}
                  className="input_field input_field_full"
                  isRequired={true}
                />

                <Button type="submit" className="submit_btn">
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          </>
        )}
        {fieldIdentity === 3 && (
          <>
            <div className="kyc_page_content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="images_section">
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.FrontSideImage && (
                          <img src={cardInfoForUIOnly?.FrontSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Front Side(Max: 15MB)"
                      type="file"
                      name="FrontSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.BackSideImage && (
                          <img src={cardInfoForUIOnly?.BackSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Back Side(Max: 15MB)"
                      type="file"
                      name="BackSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                </div>
                <Input
                  label="National ID Number"
                  type="text"
                  name="cardNumber"
                  placeholder="Enter National ID Card Number"
                  onChange={(e) =>
                    setCardInfoForUIOnly({
                      ...cardInfoForUIOnly,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={cardInfoForUIOnly?.cardNumber}
                  className="input_field input_field_full"
                  isRequired={true}
                />

                <Button type="submit" className="submit_btn">
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          </>
        )}
        {fieldIdentity === 4 && (
          <>
            <div className="kyc_page_content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="images_section">
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.FrontSideImage && (
                          <img src={cardInfoForUIOnly?.FrontSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Front Side(Max: 15MB)"
                      type="file"
                      name="FrontSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.BackSideImage && (
                          <img src={cardInfoForUIOnly?.BackSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Back Side(Max: 15MB)"
                      type="file"
                      name="BackSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                </div>
                <Input
                  label="Voter ID Card Number"
                  type="text"
                  name="cardNumber"
                  placeholder="Enter Voter ID Card Number"
                  onChange={(e) =>
                    setCardInfoForUIOnly({
                      ...cardInfoForUIOnly,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={cardInfoForUIOnly?.cardNumber}
                  className="input_field input_field_full"
                  isRequired={true}
                />
                <Button type="submit" className="submit_btn">
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          </>
        )}
        {fieldIdentity === 5 && (
          <>
            <div className="kyc_page_content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="images_section">
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.FrontSideImage && (
                          <img src={cardInfoForUIOnly?.FrontSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Front Side(Max: 15MB)"
                      type="file"
                      name="FrontSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                  <div className="kyc_box">
                    {(cardInfoForUIOnly?.BackSideImage ||
                      cardInfoForUIOnly?.FrontSideImage) && (
                      <div className="image_preview">
                        {cardInfoForUIOnly?.BackSideImage && (
                          <img src={cardInfoForUIOnly?.BackSideImage} alt="" />
                        )}
                      </div>
                    )}
                    <Input
                      label="Back Side(Max: 15MB)"
                      type="file"
                      name="BackSideImage"
                      onChange={handleImageChange}
                      className="input_field"
                      isRequired={true}
                      warning={<ImageWarning />}
                    />
                  </div>
                </div>
                <Input
                  label="Driving License Number"
                  type="text"
                  name="cardNumber"
                  placeholder="Enter Driving License Number"
                  onChange={(e) =>
                    setCardInfoForUIOnly({
                      ...cardInfoForUIOnly,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={cardInfoForUIOnly?.cardNumber}
                  className="input_field input_field_full"
                  isRequired={true}
                />

                <Button type="submit" className="submit_btn">
                  {loading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          </>
        )}
      </CardLayout>

      {/* view kyc */}
      <ViewKYC />
    </div>
  );
};

export default AddKyc;

