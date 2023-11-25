import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { Notification } from "../../../components/ToastNotification";
import {
  useActiveUserListQuery,
  useEditUserStatusMutation,
} from "../../../Services/userApi";
import ActiveMemberTable from "./table/activeMemberTable";

const ActiveMember = () => {
  // get all active member
  const { data, isLoadingActiveUser } = useActiveUserListQuery();
  // blocked member
  const [blockMember, { data: blockData, error: blockError }] =
    useEditUserStatusMutation();
  useEffect(() => {
    if (blockData?.message) {
      Notification(blockData?.message, "success");
    } else {
      Notification(blockError?.data?.message, "error");
    }
  }, [blockError, blockData]);
  const blockHandler = async (body) => {
    await blockMember(body);
  };
  const [filterData, setFilterData] = useState([]);
  const [date, setDate] = useState("");
  const [monthWiseFilterData, setMonthWiseFilterData] = useState({});
  useEffect(() => {
    if (monthWiseFilterData?.year && monthWiseFilterData?.month) {
      const filtRes = data?.data?.filter((d, i) =>
        d?.joiningDate?.includes(monthWiseFilterData?.year)
      );
      const res = filtRes?.filter((d) =>
        d?.joiningDate?.includes(monthWiseFilterData?.month)
      );
      setFilterData(res);
    }
  }, [monthWiseFilterData?.year, monthWiseFilterData?.month]);
  useEffect(() => {
    const filterDate = new Date(date).toDateString();
    const filterResult = data?.data?.filter(
      (d) => d?.joiningDate == filterDate
    );
    setFilterData(filterResult);
  }, [date]);

  if (isLoadingActiveUser) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="activemember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Active Members (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={data?.data}
        setFilterData={setFilterData}
        setDate={setDate}
        setMonthWiseFilterData={setMonthWiseFilterData}
        monthWiseFilterData={monthWiseFilterData}
        table={
          <ActiveMemberTable
            data={filterData?.length > 0 ? filterData : data?.data}
            blockHandler={blockHandler}
          />
        }
      />
    </>
  );
};

export default ActiveMember;
