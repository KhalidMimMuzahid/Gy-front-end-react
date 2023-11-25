import React, { useState, useRef } from "react";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useEffect } from "react";
import SuccessKYCTable from "./Table/successKYCTable";
import Loading from "../../../components/Loading/Loading";
import { useGetsuccesskycAdminQuery } from "../../../Services/userApi";

const SuccessFulKYC = () => {
  const {
    data: successKyc,
    isLoading: kycLoading,
    isFetching: kycFetching,
  } = useGetsuccesskycAdminQuery();
  const [successfulData, setSuccessfulData] = useState([]);

  useEffect(() => {
    setSuccessfulData(successKyc?.data?.filter((kyc) => kyc?.status === "success"));
  }, [successKyc]);

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
        sectionTableTitle={`Successful KYC (${successfulData?.length})`}
        data={successfulData}
        setFilterData={setFilterData}
        table={
          <SuccessKYCTable
            data={filterData?.length > 0 ? filterData : successfulData}
            showImageDetails={showImageDetails}
          />
        }
      />{" "}
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

export default SuccessFulKYC;
