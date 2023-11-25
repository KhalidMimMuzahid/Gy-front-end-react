import React, { useRef, useState } from "react";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useTicketHistoryQuery } from "../../../Services/SupportApi";
import TicketHistoryTable from "./table/ticketHistoryTable";

const TicketHistoryPage = () => {
  const [details, setDetails] = useState({});
  const showMessage = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };
  const { data: TicketHistory } = useTicketHistoryQuery();
  const [openModal, setOpenModal] = useState(false);
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalRef = useRef(null);
  const modalImageRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  return (
    <>
      <SectionCommonTable
        wrapperClassName="mytopuphistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Ticket History"
        table={
          <TicketHistoryTable
            data={TicketHistory}
            showImageDetails={showImageDetails}
            showMessage={showMessage}
          />
        }
      />
      <Modal
        openModal={openModalForImage}
        setOpenModal={setOpenModalForImage}
        modalTitle="Transaction Proof Image"
        modalRef={modalImageRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details" style={{ textAlign: "center" }}>
            <img
              style={{ width: "70%", margin: "10px auto" }}
              src={details?.image?.avatar}
              alt=""
            ></img>
          </div>
        </div>
      </Modal>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Message"
        modalRef={modalRef}
      >
        <div className="ss-trade_message_modal_field">
          <div className="message_details">
            <div className="message_group">
              <p>{details?.question}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TicketHistoryPage;
