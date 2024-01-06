import { useEffect, useState, useRef } from "react";
import {
  useAddGoogleLoginMutation,
  useCheckLoginMutation,
  useGetValidateSponsorIdQuery,
} from "../Services/userApi";
import { env } from "../env";
import { useNavigate } from "react-router-dom";
import { Notification } from "../components/ToastNotification";
import { useClickOutside } from "./useClickOutside";
import { gapi } from "gapi-script";
import { savedLocalStorage } from "../utils/function/localStorage";

const useGoogleLogin = () => {
  const navigate = useNavigate();

  // handle google sign in
  const [addGoogleLogin, { data: eData, error: gError, isLoading: loading }] =
    useAddGoogleLoginMutation();
  // Check
  const [isCheck, { data: cData }] = useCheckLoginMutation();
  console.log({ cData });
  const [value, setValue] = useState({});
  const [sponsorId, setSponsorId] = useState();
  const [handel, setHandel] = useState(false);
  const [sponsoreName, setSponsorName] = useState("");
  const [handelSponsore, setHandelSponsore] = useState("");

  const handleOnChange = (e) => {
    // Update only the specific property in the state
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    // Destructure value to get sponsorid
    const { sponsorid, ...rest } = value;

    if (sponsorid && sponsorid.length >= 0) {
      setHandel(true);
      setSponsorId(sponsorid);
    } else {
      setHandel(false);
    }
  }, [value.sponsorid]);

  const { data: sponsoridData, error: sponsoridError } =
    useGetValidateSponsorIdQuery(sponsorId);

  useEffect(() => {
    if (sponsoridError?.data?.message) {
      // setSponError(sponsoridError?.data?.message);
      setSponsorName("");
    } else if (sponsoridData?.name) {
      setSponsorName(sponsoridData?.name);
    }
  }, [sponsoridError?.data, sponsoridData?.name]);

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    console.log("hello click");
    await addGoogleLogin(value);
  };
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  useClickOutside(modalRef, () => setOpenModal(false));



  const responseGoogle = async (response) => {
    console.log({ response });
    setValue({
      ...value,
      tokenId: response?.tokenId,
      first_name: response?.profileObj?.givenName,
      last_name: response?.profileObj?.familyName,
    });

    console.log({ response });
    const token = {
      email: response?.profileObj?.email,
    };
    await isCheck(token);
  };



  // console.log(responseGoogle);
  useEffect(() => {
    if (cData?.isLoggedIn === true) {
      setOpenModal(false);
      addGoogleLogin(value);
    } else if (cData?.isLoggedIn === false) {
      addGoogleLogin(value);
      setOpenModal(true);
    }
    return;
  }, [cData]);
  const resFailed = () => {
    Notification("All fields are required", "error");
  };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: env.google_client_id,
        plugin_name: "faucets-app",
      });
    });
    return;
  }, []);
  console.log("my  response", eData);
  console.log("my value", value);
  useEffect(() => {
    console.log("tiem");
    if (eData?.isLoggedIn) {
      Notification(eData?.message, "success");
      savedLocalStorage("grow_more_today_token", eData?.token);
      navigate("/dashboard");
      setOpenModal(false);
    } else {
      Notification(gError?.data?.message, "error");
    }
    return;
  }, [gError, eData, navigate]);
  return {
    responseGoogle,
    resFailed,
    openModal,
    setOpenModal,
    modalRef,
    value,
    setValue,
    handleGoogleLogin,
    handleOnChange,
    loading,
    handel,
    sponsoreName,
  };
};
export default useGoogleLogin;
