import React from "react";
import { useRef } from "react";
import { useState } from "react";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useGetAllContactUsQuery } from "../../../Services/SupportApi";
import AdminContactHistory from "./Table/AdminContactHistory";

const ContactUs = () => {
  const { data } = useGetAllContactUsQuery();
  const [details, setDetails] = useState({});
  const showMessage = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [filterData, setFilterData] = useState([]);
  return (
    <>
      <SectionCommonTable
        wrapperClassName="updateNews_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="ALL Contact Us Messages"
        data={data && data[0]?.history}
        setFilterData={setFilterData}
        table={
          <AdminContactHistory
            data={filterData?.length > 0 ? filterData : data && data[0]?.history}
            showMessage={showMessage}
          />
        }
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Message"
        modalRef={modalRef}
      >
        <div className="ss-trade_message_modal_field">
          <div className="message_details">
            <div className="message_group">
              <p>{details?.message}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactUs;
