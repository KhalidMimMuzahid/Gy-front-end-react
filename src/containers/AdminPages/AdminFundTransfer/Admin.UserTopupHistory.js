import React, { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useGetUserTopupHistoryAdminQuery } from "../../../Services/earningApi";
import UserTopupHistoryTable from "./table/UserTopupHistoryTable";

const UserTopupHistory = () => {
  // get all fund transfer
  const { data, isLoading } = useGetUserTopupHistoryAdminQuery();
  const [filterData, setFilterData] = useState([]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="fundtransfer_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All User Topup History(${
          data?.allTopupHistory?.length ? data?.allTopupHistory?.length : "0"
        })`}
        data={
          filterData?.allTopupHistory?.length > 0
            ? filterData
            : data?.allTopupHistory
        }
        setFilterData={setFilterData}
        table={
          <UserTopupHistoryTable
            data={
              filterData?.allTopupHistory?.length > 0
                ? filterData
                : data?.allTopupHistory
            }
          />
        }
      />
    </>
  );
};

export default UserTopupHistory;
