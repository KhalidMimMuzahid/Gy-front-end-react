import React, { useRef, useState } from "react";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useGetUpdatesQuery } from "../../../Services/SupportApi";
import UpdateNewsTable from "./table/updateTable";

const UpdateNewsPage = () => {
  const [details, setDetails] = useState({});
  const showMessage = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const { data } = useGetUpdatesQuery();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));

  return (
    <>
      <SectionCommonTable
        wrapperClassName="updateNews_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Update News"
        table={
          <UpdateNewsTable
            data={data?.data}
            showMessage={showMessage}
          />
        }
      />

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={details?.title}
        modalRef={modalRef}
      >
        <div className="ss-trade_message_modal_field">
          <div className="message_details">
            <div className="message_group">
              <p>{details?.description}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateNewsPage;
