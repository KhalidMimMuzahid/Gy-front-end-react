import React, { useState, useRef } from "react";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import RejectedKYCTable from "./Table/rejectedKYCTable";
import { useGetrejectedkycAdminQuery } from "../../../Services/userApi";

const RejectedKYC = () => {
  const {
    data: rejectedKyc,
    isLoading: kycLoading,
    isFetching: kycFetching,
  } = useGetrejectedkycAdminQuery();
  const [filterData, setFilterData] = useState([]);

  /* modal section */
  const [details, setDetails] = useState({});

  /* image modal  */
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };

  if (kycFetching || kycLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName='allmember_table'
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Rejected KYC (${
          filterData?.length || rejectedKyc?.data?.length
        })`}
        data={rejectedKyc?.data}
        setFilterData={setFilterData}
        table={
          <RejectedKYCTable
            data={filterData || rejectedKyc?.data}
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
      </Modal>{" "}
    </>
  );
};

export default RejectedKYC;
