import React from "react";
import SectionCommonTable from "../../../components/SectionCommonTable";
import Loading from "../../../components/Loading/Loading";
import AutoTradeUsersTable from "./Table/AutoTradeUsersTable";
import { useGetAutoTradeUsersQuery } from "../../../Services/userApi";
const AutoTradeUsers = () => {
  const { data: autoTradeUsers, isLoading: isLoadingAutoTradLoading } = useGetAutoTradeUsersQuery();
  if (isLoadingAutoTradLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle="Auto Trade Users"
          table={<AutoTradeUsersTable data={autoTradeUsers?.data} />}
        />
      </div>
    </>
  );
};

export default AutoTradeUsers;
