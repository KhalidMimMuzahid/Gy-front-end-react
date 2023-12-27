import React, { useState } from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetAllStakingIncomeHistoryAdminQuery } from "../../../Services/earningApi";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Loading from "../../../components/Loading/Loading";
import WinningAmountTable from "./Table/WinningAmountTable";
const WinningAmount = () => {
  const { data, isLoading } = useGetAllStakingIncomeHistoryAdminQuery();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };

  const [filterData, setFilterData] = useState([]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle={`Winning Amount (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={filterData?.length > 0 ? filterData : data?.data}
          setFilterData={setFilterData}
          table={
            <WinningAmountTable
              data={filterData?.length > 0 ? filterData : data?.data}
              showDetails={showDetails}
            />
          }
        />
      </div>
    </>
  );
};

export default WinningAmount;
