import React, { useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/Button";
import CardLayout from "../../../components/CardLayout";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import { Notification } from "../../../components/ToastNotification";
import { supportTicketValidate } from "../../../components/Validation/vaildate";
import {
  useAddSupportTicketMutation,
  useTicketHistoryQuery,
} from "../../../Services/SupportApi";
import { useGetLoginUserQuery } from "../../../Services/userApi";

const purpose = [
  "Wallet",
  "Deposit fund",
  "Direct income",
  "Profit Share",
  "Withdraw",
  " Actinic Bonus",
  "Rank Income",
  "Top Up",
  "Other Support",
  "Trx Password",
];
const previousTicket = ["New Complaint"];

const SupportTicketPage = () => {
  // get ticket history
  const { data: TicketHistory } = useTicketHistoryQuery();
  // get user info
  const { data: userData } = useGetLoginUserQuery();
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    purpose: "",
    previous_ticket_reff: TicketHistory?.history[0]?.previous_ticket_reff,
    question: "",
    proof: "",
  });

  // error
  useEffect(() => {
    setFormErrors(supportTicketValidate(data));
  }, [data]);

  const [AddSupportTicket, { data: response, error, isLoading }] =
    useAddSupportTicketMutation();

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
      setData({
        purpose: "",
        previous_ticket_reff: "",
        question: "",
        proof: "",
      });
      document.getElementById("proof").value = ""; // file input field reset
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", data.proof);
    formData.append("purpose", data.purpose);
    formData.append("previous_ticket_reff", data.previous_ticket_reff);
    formData.append("question", data.question);
    if (Object.keys(formErrors).length > 0) {
      Notification("All field are required", "error");
    } else {
      await AddSupportTicket(formData);
    }
  };

  return (
    <div className='ss-trade_supportticket_page_wrapper'>
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className='ss-trade_supporttickett_form_card'
      >
        <div className='ss-trade_section_title'>
          <h2>Support Ticket</h2>
        </div>
        <div className='ss-trade_supportticket_page_content'>
          <form onSubmit={handleSubmit}>
            <div className='form_group'>
              <div className='purpose'>
                <Select
                  label='Purpose'
                  className='select_field'
                  value={data.purpose}
                  name='purpose'
                  onChange={(e) =>
                    setData({
                      ...data,
                      purpose:
                        e.target.value === "--select--" ? "" : e.target.value,
                    })
                  }
                  options={purpose}
                  isRequired={true}
                />
              </div>
              <div className='ticket_reference'>
                <Select
                  label='Previous Ticket Reference'
                  value={data.previous_ticket_reff}
                  name='previous_ticket_reff'
                  onChange={(e) =>
                    setData({
                      ...data,
                      previous_ticket_reff:
                        e.target.value === "--select--" ? "" : e.target.value,
                    })
                  }
                  options={previousTicket}
                  isRequired={true}
                />
              </div>
            </div>
            <div className='form_group'>
              <div className='purpose'>
                <Input
                  label='Image'
                  type='file'
                  name='proof'
                  id='proof'
                  placeholder='Enter your image'
                  onChange={(e) =>
                    setData({ ...data, proof: e.target.files[0] })
                  }
                  className='input_field'
                  inputGroupClass='left'
                />
              </div>
              <div className='ticket_reference'>
                <Input
                  label='User ID'
                  type='text'
                  name='user_id'
                  value={userData?.data?.userId}
                  placeholder='Enter your user id'
                  disabled={true}
                  className='input_field'
                  inputGroupClass='right'
                />
              </div>
            </div>
            <div
              className='form_group text_area'
              style={{ display: "inherit" }}
            >
              <TextArea
                label='Your Question'
                name='question'
                cols='30'
                rows='10'
                onChange={(e) => setData({ ...data, question: e.target.value })}
                value={data.question}
                className='question_field'
                placeholder='Write your questions...'
              />
            </div>
            <Button
              type='submit'
              className='submit_btn'
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

export default SupportTicketPage;
