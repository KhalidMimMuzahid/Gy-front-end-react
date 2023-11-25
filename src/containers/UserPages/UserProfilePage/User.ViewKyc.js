import React, { useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import Modal from "../../../components/Modal";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef } from "react";
import Loading from "../../../components/Loading/Loading";
import ViewKYCTable from "./Table/ViewKycTable";
import { useGetUserKycQuery } from "../../../Services/userApi";

const ViewKYC = () => {
  const { data: userKyc, isLoading: userKycLoading } = useGetUserKycQuery();

  const [details, setDetails] = useState({});
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };
  if (userKycLoading) {
    return <Loading />;
  }
  return (
    <div>
      <SectionCommonTable
        wrapperClassName='deposithistory_table'
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle='View KYC'
        table={
          <ViewKYCTable
            data={userKyc?.data}
            showImageDetails={showImageDetails}
          />
        }
      />
      <Modal
        openModal={openModalForImage}
        setOpenModal={setOpenModalForImage}
        modalTitle='KYC Image'
        modalRef={modalImageRef}
      >
        <div className='tp_commol_modal_field'>
          <div className='transaction_details' style={{ textAlign: "center" }}>
            <img
              style={{ width: "80%", margin: "20px auto" }}
              src={details?.proof}
              alt=''
            ></img>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewKYC;
