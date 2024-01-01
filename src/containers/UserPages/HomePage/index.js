import React, { useEffect, useState, useRef } from "react";
// import HomeCard from "./Home.Card";
import { Notification } from "../../../components/ToastNotification";
import { BsWhatsapp, BsTelegram, BsFacebook } from "react-icons/bs";
import { ImCopy } from "react-icons/im";
// import InDirectIncome from "../../../assets/dashboardIcon/indriectincome.png";
// import DirectIncome from "../../../assets/dashboardIcon/direct_income.png";
import {
  // useGetDashboardStatsQuery,
  useGetLoginUserQuery,
} from "../../../Services/userApi";
// import { popupShow } from "../../../containers/AuthPages/Login";
// import Modal from "../../../components/Modal";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useGetPopupImageQuery } from "../../../Services/Setting";
import TopupHistoryPage from "../TopupPage/Topup.TopupHistoryPage";
import SectionCommonTable from "../../../components/SectionCommonTable";
import RoiIncomeTable from "../Earnings/Table/RoiIncomeTable";
import { useGetRoiIncomeHistoryUserQuery } from "../../../Services/earningApi";
import { useGetAllWalletQuery } from "../../../Services/walletApi";
import ColorGame from "../Games/ColorGames";
import UserCurrentPeriodBettingHistory from "../Games/UserCurrentPeriodBettingHistory";



const HomePage = () => {
  // const { data, isLoading } = useGetAllWalletQuery();
  // const { data: popupImage } = useGetPopupImageQuery();
  // const { data: userState } = useGetDashboardStatsQuery();
  // get user data
  const { data: userData } = useGetLoginUserQuery();
  // const [openModalForImage, setOpenModalForImage] = useState(popupShow);
  // const modalImageRef = useRef(null);
  // useClickOutside(modalImageRef, () => setOpenModalForImage(false));

  const [inputVal, setInputVal] = useState({
    leftVal: `${window.location.origin}/register?sponsorid=${userData?.data?.userId}`,
  });
  const copyToClipboard = (type) => {
    if (type === "left") {
      navigator.clipboard.writeText(inputVal.leftVal);
      Notification("Text copied", "success");
    }
  };
  useEffect(() => {
    setInputVal({
      leftVal: `${window.location.origin}/register?sponsorid=${userData?.data?.userId}`,
    });
  }, [userData?.data?.userId]);

  // facebook post share handle
  const handleFbShareButtonClick = () => {
    const appUrl = `${window.location.origin}/register?sponsorid=${userData?.data?.userId}`;
    const postUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      appUrl
    )}`;
    window.open(postUrl, "_blank");
  };

  // roinincome table data
  const { data: roiData } = useGetRoiIncomeHistoryUserQuery();
  // modal toggle
  const [, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  // const [, setValues] = useState({});
  // const showDetails = (body) => {
  //   setValues(body);
  //   setOpenModal(true);
  // };

  // telegram post share handle
  const handleTeShareButtonClick = () => {
    const postText = "Join Grow More";
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      `${window.location.origin}/register?sponsorid=${userData?.data?.userId}`
    )}&text=${encodeURIComponent(postText)}`;
    window.open(telegramUrl, "_blank");
  };

  // whatsapp share handle
  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}/register?sponsorid=${userData?.data?.userId}`;
    const message = encodeURIComponent("Join Grow More: " + url);

    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className='ss-trade_homPage_wrapper' id='pddfff'>
      {/* <div className="ss-trade_homPage_important_notice_section">
        <img
          className=""
          src="https://res.cloudinary.com/deavhufn6/image/upload/v1691001858/coming_soon_yzpthk.png"
          alt="Safe & Secure Trade coming soon"
        />
      </div> */}
      <div className='ss-trade_section_title for_download_handle'>
        <h2>Dashboard</h2>
      </div>
      <div className='importantLinks'>
        <span>Referrel URL </span>
        <div className='socialLinksBox'>
          <div className='socialLinks'>
            {/* refer link */}
            <button
              className='refferLink'
              onClick={() => copyToClipboard("left")}
            >
              <ImCopy /> Copy reffer link
            </button>
            {/* whatsapp */}
            <button className='refWhatsappButton' onClick={shareOnWhatsApp}>
              <BsWhatsapp /> Whatsapp
            </button>
          </div>
          <div className='socialLinks'>
            {/* facebook */}
            <button
              className='refFacebookButton'
              onClick={handleFbShareButtonClick}
            >
              <BsFacebook /> Facebook
            </button>
            {/* telegram */}
            <button
              className='refTelegramButton'
              onClick={handleTeShareButtonClick}
            >
              <BsTelegram /> Telegram
            </button>
          </div>
        </div>
      </div>
      {/* 1st row */}
      <div className='first_row dashboard_content'>
        <div className='ss-trade_dash_content_item'>
        <ColorGame/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
