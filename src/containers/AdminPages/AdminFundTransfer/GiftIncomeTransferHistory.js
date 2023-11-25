import React, { useRef, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useGetGiftTransferHistoryAdminQuery } from "../../../Services/earningApi";
import GiftIncomeTransferHistoryTable from "./table/GiftIncomeTransferHistoryTable";

const GiftIncomeTransferHistory = () => {
  // get all fund transfer
  const { data, isLoading } = useGetGiftTransferHistoryAdminQuery();

  const [filterData, setFilterData] = useState([]);

  if(isLoading){
    return <Loading/>
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="fundtransfer_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Gift Income transfer History(${
          data?.gift_income?.length ? data?.gift_income?.length : "0"
        })`}
        data={data?.gift_income}
        setFilterData={setFilterData}
        table={
          <GiftIncomeTransferHistoryTable
            data={filterData?.gift_income?.length > 0 ? filterData : data?.gift_income}
          />
        }
      />
    </>
  );
};

export default GiftIncomeTransferHistory;
