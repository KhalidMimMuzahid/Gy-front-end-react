import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { Notification } from "../../../components/ToastNotification";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  useAddSendGiftAllUserAdminMutation,
  useAddSendGiftSingleUserAdminMutation,
  useGetGiftTransferUserListAdminQuery,
} from "../../../Services/earningApi";
import GiftIncomeTransferListTable from "./table/GiftIncomeTransferListTable";

const GiftIncomeTransfer = () => {
  // get all fund transfer
  const { data, isLoading } = useGetGiftTransferUserListAdminQuery();
  const [
    addGiftSingleUser,
    {
      data: GiftSingleUserData,
      error: singleUserError,
      isLoading: singleUserLoading,
    },
  ] = useAddSendGiftSingleUserAdminMutation();

  useEffect(() => {
    if (GiftSingleUserData?.message) {
      Notification(GiftSingleUserData?.message, "success");
    } else {
      Notification(singleUserError?.data?.message, "error");
    }
  }, [GiftSingleUserData, singleUserError]);

  const [
    addGiftAllUser,
    {
      data: giftAllUserData,
      error: giftAllUserError,
      isLoading: giftAllUserLoading,
    },
  ] = useAddSendGiftAllUserAdminMutation();

  useEffect(() => {
    if (giftAllUserData?.message) {
      Notification(giftAllUserData?.message, "success");
    } else {
      Notification(giftAllUserError?.data?.message, "error");
    }
  }, [giftAllUserData, giftAllUserError]);

  const [filterData, setFilterData] = useState([]);
  const [sendGift, setSendGift] = useState([]);

  if (isLoading) {
    return <Loading />;
  }
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)?.toDateString();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)?.toDateString();
  const toDay = date.toDateString();
  return (
    <>
      <SectionCommonTable
        wrapperClassName="fundtransfer_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Gift Income transfer (${
          data?.eligibleUser?.length ? data?.eligibleUser?.length : "0"
        })`}
        addGiftAllUser={addGiftAllUser}
        toDay={toDay}
        lastDay={lastDay}
        firstDay={firstDay}
        data={data?.eligibleUser}
        setFilterData={setFilterData}
        table={
          <GiftIncomeTransferListTable
            data={
              filterData?.eligibleUser?.length >= 0
                ? filterData
                : data?.eligibleUser
            }
            sendGift={setSendGift}
            addGiftSingleUser={addGiftSingleUser}
          />
        }
      />
    </>
  );
};

export default GiftIncomeTransfer;

const dummyData = {
  eligibleUser: [
    {
      user_id: "RF001",
      user_name: "pk khan",
      history: "this is the first week",
      gifted_date: 1671525928944,
      join_date: 1671525928944,
    },
    {
      user_id: "RF002",
      user_name: "de khan",
      history: "this is the first week",
      gifted_date: 1671525928944,
      join_date: 1671525928944,
    },
    {
      user_id: "RF003",
      user_name: "messi khan",
      history: "this is the first week",
      gifted_date: 1671525928944,
      join_date: 1671525928944,
    },
  ],
};
