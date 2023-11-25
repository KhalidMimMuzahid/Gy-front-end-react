import React from "react";
import { useRef } from "react";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useGetDepositHistoryQuery } from "../../../Services/walletApi";
import DepositHistoryTable from "./table/depositHistoryTable";

const DepositFundHistoryPage = () => {
  const { data , isLoading, error} = useGetDepositHistoryQuery();
  const [details, setDetails] = useState({});
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="deposithistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Deposit History"
        table={<DepositHistoryTable data={data}   showImageDetails={showImageDetails}/>}
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
              style={{ width: "70%", margin: "20px auto" }}
              src={details?.proofPic?.avatar}
              alt=""
            ></img>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DepositFundHistoryPage;
