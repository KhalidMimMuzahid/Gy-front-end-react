import { Bounce, toast } from "react-toastify";

export const Notification = (msg, type) => {
  const options = {
    autoClose: 1500,
    type: type,
    hideProgressBar: false,
    position: toast.POSITION.TOP_CENTER,
    pauseOnHover: false,
    transition: Bounce,
  };
  return toast(msg, options);
};
