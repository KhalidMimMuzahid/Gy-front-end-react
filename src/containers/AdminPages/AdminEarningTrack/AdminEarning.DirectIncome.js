import React, { useRef, useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllDirLevIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import DirectIncomeTable from "./Table/DirectIncomeTable";
import TransactionModal from "../../../components/Modal/TransactionModal";
import { useClickOutside } from "../../../hooks/useClickOutside";
const DirectIncome = () => {
  const { data: DirectIncome } = useGetAllDirLevIncomeHistoryAdminQuery();
  const directIncome = DirectIncome?.data?.filter((d) => d.level === "1");
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };

  const modalData = {
    fullName: values?.full_name,
    userid: values?.user_id,
    amount: "₹" + values?.amount,
    package: "₹" + values?.selfPackageInfo?.amount,
    FromUserId: values?.income_from,
    FromPackage: "₹" + values?.levelUserPackageInfo?.amount,
    date: new Date(values?.createdAt).toDateString(),
    time: new Date(values?.createdAt).toLocaleTimeString(),
    status: "success",
  };

  return (
    <>
      <div className='UserEarning_wallet_page_wrapper'>
        <SectionCommonTable
          wrapperClassName='roi_table'
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle='Direct Income'
          table={
            <DirectIncomeTable data={directIncome} showDetails={showDetails} />
          }
        />
      </div>
      <TransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalRef={modalRef}
        modalTitle='Details'
        objValue={modalData}
      />
    </>
  );
};

export default DirectIncome;
