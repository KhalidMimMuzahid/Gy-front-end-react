import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import Loading from "../../../components/Loading/Loading";
import AutoTradeUpgradeHistoryTable from "./Table/AutoTradeUpgradeHistoryTable";
import { useGetAutoTradeAllUpgradeHistoryQuery } from "../../../Services/userApi";
const AutoTradeUpgradeHistory = () => {
  const { data: autoTrade, isLoading: isLoadingAutoTrade } = useGetAutoTradeAllUpgradeHistoryQuery();
  if (isLoadingAutoTrade) {
    return <Loading />;
  }
  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle="Auto Trade Upgrade History"
          table={<AutoTradeUpgradeHistoryTable data={autoTrade?.data} />}
        />
      </div>
    </>
  );
};

export default AutoTradeUpgradeHistory;
