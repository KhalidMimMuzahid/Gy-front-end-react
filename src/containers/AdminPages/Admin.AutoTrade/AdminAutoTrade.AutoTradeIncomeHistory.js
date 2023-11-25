import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import Loading from "../../../components/Loading/Loading";
import AutoTradeIncomeHistoryTable from "./Table/AutoTradeIncomeHistoryTable";
import { useGetAutoTradeAllRoiIncomeHistoryQuery } from "../../../Services/userApi";
const AutoTradeIncomeHistory = () => {
  const { data: autoTrade, isLoading: isLoadingAutoTrade} = useGetAutoTradeAllRoiIncomeHistoryQuery();
  if (isLoadingAutoTrade) {
    return <Loading />;
  }
  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle="Auto Trade Income History"
          table={<AutoTradeIncomeHistoryTable data={autoTrade?.data} />}
        />
      </div>
    </>
  );
};

export default AutoTradeIncomeHistory;
