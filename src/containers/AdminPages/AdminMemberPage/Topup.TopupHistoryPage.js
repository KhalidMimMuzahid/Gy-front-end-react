import React, { useState, useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import TopupHistoryByAdminTable from "./table/topupHistoryTable";
import SectionCommonTable from "../../../components/SectionCommonTable";
import { useParams } from "react-router-dom";
import { useGetMemberBusinessHistoryQuery } from "../../../Services/userApi";

const TopupHistoryByAdminPage = () => {
  const params = useParams();
  const { data, isLoading } = useGetMemberBusinessHistoryQuery({
    level: params?.level,
    userId: params?.userid,
  });

  const [filterData, setFilterData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");
  const [monthWiseFilterData, setMonthWiseFilterData] = useState({});

  useEffect(() => {
    if (monthWiseFilterData?.year && monthWiseFilterData?.month) {
      const filtRes = data?.data?.filter((d, i) =>
        d?.packageInfo?.date?.includes(monthWiseFilterData?.year)
      );
      const res = filtRes?.filter((d) =>
        d?.packageInfo?.date?.includes(monthWiseFilterData?.month)
      );
      setFilterData(res);
    }
  }, [monthWiseFilterData?.year, monthWiseFilterData?.month]);

  useEffect(() => {
    const filterDate = new Date(date).toDateString();
    const filterResult = data?.data?.filter(
      (d) => d?.packageInfo?.date == filterDate
    );
    setFilterData(filterResult);
  }, [date]);

  useEffect(() => {
    const arr = filterData?.length > 0 ? filterData : data?.data;
    const sum = arr?.reduce(
      (acc, value) => acc + value?.packageInfo?.amount,
      0
    );
    setTotalAmount(sum?.toFixed(2));
  }, [filterData, data?.data]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="topuphistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Business History (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={data?.data}
        setFilterData={setFilterData}
        countContainer={totalAmount}
        setDate={setDate}
        date={date}
        setMonthWiseFilterData={setMonthWiseFilterData}
        monthWiseFilterData={monthWiseFilterData}
        table={
          <TopupHistoryByAdminTable
            data={filterData?.length > 0 ? filterData : data?.data}
          />
        }
      />
    </>
  );
};

export default TopupHistoryByAdminPage;
