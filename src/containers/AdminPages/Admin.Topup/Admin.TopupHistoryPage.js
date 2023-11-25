import React, { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import AdminTopupHistoryTable from "./table/adminTopupHistoryTable";
import { useGetAllTopUpHistoryQuery } from "../../../Services/topupApi";
import SectionCommonTable from "../../../components/SectionCommonTable";

const AdminTopupHistoryPage = () => {
  const { data, isLoading } = useGetAllTopUpHistoryQuery();
  const [filterData, setFilterData] = useState([]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="topuphistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Top Up History (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={filterData?.length > 0 ? filterData : data?.data}
        setFilterData={setFilterData}
        table={
          <AdminTopupHistoryTable
            data={filterData?.length > 0 ? filterData : data?.data}
          />
        }
      />
    </>
  );
};

export default AdminTopupHistoryPage;
