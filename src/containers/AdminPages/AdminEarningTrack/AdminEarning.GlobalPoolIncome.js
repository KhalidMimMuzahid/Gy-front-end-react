import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/CardLayout";
import SectionCommonTable from "../../../components/SectionCommonTable";
import GlobalIncomeTable from "./Table/GlobalPoolIncomeTable";
import {
  useAddGlobalPoolIncomeAdminMutation,
  useGetAllGlobalPoolIncomeHistoryAdminQuery,
  useGetGlobalPoolUserListAdminQuery,
} from "../../../Services/earningApi";
import { Notification } from "../../../components/ToastNotification";
const GlobalPoolIncome = () => {
  const {data: globalUserList} = useGetGlobalPoolUserListAdminQuery();
  const [amount, setAmount] = useState(0);
  // History
  const { data: poolIncomeHistory } =
    useGetAllGlobalPoolIncomeHistoryAdminQuery();
  // Send global Income to eligible users
  const [addGlobalPoolIncome, { data: globalData, error, isLoading }] =
    useAddGlobalPoolIncomeAdminMutation();
  useEffect(() => {
    if (globalData?.message) {
      Notification(globalData?.message, "success");
      setAmount("");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, globalData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      amount: amount,
    };
    addGlobalPoolIncome(obj);
  };

  return (
    <div className="ss-trade_boosterIncome" id="draggableZone2">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_boosterIncome_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Global Pool Income</h2>
        </div>
        <div className="ss-trade_boosterIncome_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group global__group">
              <input
                type="number"
                placeholder="Enter global pool amount"
                className="search__input"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                type="submit"
                className="send__btn"
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Loading..." : "Send"}
              </button>
            </div>
          </form>
          <div className="ss-trade__eligible__user__list">
            <h2>Eligible Users</h2>
            <div className="user__list">
              {
                globalUserList?.userList?.map((d, i)=>(
                  <span key={i + 1}>{d.user_id}</span>
                ))
              }
            </div>
          </div>
        </div>
      </CardLayout>
      <SectionCommonTable
        wrapperClassName="allwithdraw_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Global Pool Income History (${poolIncomeHistory?.data?.length})`}
        // data={data?.allWithdraw}
        // setFilterData={setFilterData}
        table={<GlobalIncomeTable data={poolIncomeHistory?.data} />}
      />
    </div>
  );
};

export default GlobalPoolIncome;
