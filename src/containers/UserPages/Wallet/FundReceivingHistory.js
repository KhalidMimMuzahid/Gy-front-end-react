import React from "react";
import Loading from "../../../components/Loading/Loading";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetFundReceivingHistoryQuery } from "../../../Services/walletApi";
import FundReceivingHistoryTable from "./table/FundReceivingHistoryTable";

const FundReceivingHistory = () => {
  const { data , isLoading} = useGetFundReceivingHistoryQuery();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="deposithistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="Fund Receiving History"
        table={<FundReceivingHistoryTable data={data}  />}
      />
    </>
  );
};

export default FundReceivingHistory;
