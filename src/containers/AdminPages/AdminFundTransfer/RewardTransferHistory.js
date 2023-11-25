import React, { useRef, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useGetRewardTransferHistoryAdminQuery } from "../../../Services/walletApi";
import RewardTransferHistoryTable from "./table/RewardTransferHistoryTable";

const RewardTransferHistory = () => {
  // get all fund transfer
  const { data: RewardTransferHistory, isLoading } =
    useGetRewardTransferHistoryAdminQuery();

  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [filterData, setFilterData] = useState([]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="fundtransfer_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Bonanza Transfer Report (${
          RewardTransferHistory?.reward?.length
            ? RewardTransferHistory?.reward?.length
            : "0"
        })`}
        data={RewardTransferHistory?.reward}
        setFilterData={setFilterData}
        table={
          <RewardTransferHistoryTable
            showMessage={showDetails}
            data={
              filterData.length > 0 ? filterData : RewardTransferHistory?.reward
            }
          />
        }
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Transaction Details"
        modalRef={modalRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details">
            <p>{details?.remark}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RewardTransferHistory;
