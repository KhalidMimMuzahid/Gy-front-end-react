import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { Notification } from "../../../components/ToastNotification";
import {
  useBlockUserListQuery,
  useDeleteUserListMutation,
  useEditUserStatusMutation,
} from "../../../Services/userApi";
import BlockedMemberTable from "./table/blockedMemberTable";

const BlockedMember = () => {
  // get block user
  const { data, isLoadingBlockUser } = useBlockUserListQuery();
  // unblock member
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
  // delete member
  const [deleteMember, { data: deleteData, error: deleteError }] =
    useDeleteUserListMutation();
  useEffect(() => {
    if (deleteData?.message) {
      Notification(deleteData?.message, "success");
    } else {
      Notification(deleteError?.data?.message, "error");
    }
  }, [deleteError, deleteData]);
  const deleteHandler = async (body) => {
    await deleteMember(body);
  };
  const [filterData, setFilterData] = useState([]);
  const [date, setDate] = useState("");
  const [monthWiseFilterData, setMonthWiseFilterData] = useState({});
  useEffect(() => {
    if (monthWiseFilterData?.year && monthWiseFilterData?.month) {
      const filtRes = data?.filter((d, i) =>
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
    const filterResult = data?.filter((d) => d?.joiningDate == filterDate);
    setFilterData(filterResult);
  }, [date]);
  if (isLoadingBlockUser) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="activemember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Blocked Members (${
          filterData?.length > 0 ? filterData?.length : data?.length ?? 0
        })`}
        data={data}
        setFilterData={setFilterData}
        setDate={setDate}
        setMonthWiseFilterData={setMonthWiseFilterData}
        monthWiseFilterData={monthWiseFilterData}
        table={
          <BlockedMemberTable
            data={filterData?.length > 0 ? filterData : data}
            blockHandler={blockHandler}
            deleteHandler={deleteHandler}
          />
        }
      />
    </>
  );
};

export default BlockedMember;
