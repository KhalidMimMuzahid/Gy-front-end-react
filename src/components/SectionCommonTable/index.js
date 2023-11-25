import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button";
import CardLayout from "../CardLayout";
import LevelTeamFilter from "../Filter/LevelTeamFilter";
import Input from "../Input";
import { useGetLoginUserQuery } from "../../Services/userApi";
import { userRole } from "../../config/USER_ROLE";
import { CSVLink } from "react-csv";
import { addDays } from "date-fns";
import Modal from "../Modal";
import { DateRangePicker } from "react-date-range";

const SectionCommonTable = ({
  wrapperClassName,
  cardStyle,
  sectionTableTitle,
  table,
  calculateCredit,
  calculateDebit,
  calculateContainer,
  data,
  toDay,
  lastDay,
  firstDay,
  setFilterData,
  addGiftAllUser,
  setAllTeamSearch,
  dataTeam,
  sendAll,
  adminBalance,
  modalRef,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { data: loginUserData } = useGetLoginUserQuery();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState([]);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (loginUserData?.data?.role === userRole.ADMIN) {
      setDate(dateState);
    }
  }, [dateState]);

  const searchFunction = () => {
    if (data) {
      const filterData = data?.filter((dt) => {
        if (search === "") {
          return dt;
        } else if (
          dt?.userId?.toLowerCase()?.includes(search?.toLowerCase()) ||
          dt?.fullName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          dt?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
          dt?.sponsorId?.toLowerCase()?.includes(search?.toLowerCase())
        ) {
          return dt;
        }
      });
      setFilterData(filterData);
    }
  };

  const dateFunction = () => {
    const startDate = new Date(date[0]?.startDate).toDateString();
    const startDateTimestam = Date.parse(startDate);
    const endDate = new Date(date[0]?.endDate).toDateString();
    const endDateTimestam = Date.parse(endDate);
    // main function here
    const filterResult = data?.filter(
      (d) =>
        Date.parse(
          d?.joiningDate ||
            d?.date ||
            d?.package?.date ||
            d?.packageInfo?.date ||
            d?.incomeDate ||
            d?.submission_date?.slice(0, 15)
        ) <= endDateTimestam &&
        Date.parse(
          d?.joiningDate ||
            d?.date ||
            d?.package?.date ||
            d?.packageInfo?.date ||
            d?.incomeDate ||
            d?.submission_date?.slice(0, 15)
        ) >= startDateTimestam
    );
    setFilterData(filterResult);
  };

  const dateandSearchFunct = () => {
    if (data) {
      const startDate = new Date(date[0]?.startDate).toDateString();
      const startDateTimestam = Date.parse(startDate);
      const endDate = new Date(date[0]?.endDate).toDateString();
      const endDateTimestam = Date.parse(endDate);
      const filterData = data?.filter(
        (d) =>
          d?.userId === search &&
          Date.parse(
            d?.joiningDate ||
              d?.date ||
              d?.package?.date ||
              d?.packageInfo?.date ||
              d?.incomeDate ||
              d?.submission_date?.slice(0, 15)
          ) <= endDateTimestam &&
          Date.parse(
            d?.joiningDate ||
              d?.date ||
              d?.package?.date ||
              d?.packageInfo?.date ||
              d?.incomeDate ||
              d?.submission_date?.slice(0, 15)
          ) >= startDateTimestam
      );
      setFilterData(filterData);
    }
  };

  // range filter
  useEffect(() => {
    if (date?.length > 0 && date[0]?.endDate !== null && search) {
      dateandSearchFunct();
    } else if (date?.length > 0 && date[0]?.endDate !== null) {
      dateFunction();
    } else if (search) {
      searchFunction();
    }
  }, [date, search]);

  // download data
  const getHeaders = () => {
    if (data?.length > 0) {
      return Object?.keys(data[0])?.map((key) => ({
        label: key?.toUpperCase(),
        key: key,
      }));
    }
    return [];
  };

  const headers = getHeaders();

  // calculation
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    if (data) {
      const initialValue = 0;
      const amountArr = data?.filter(
        (d) =>
          d?.amount ||
          d?.package?.amount ||
          d?.commissionAmount ||
          d?.amountAfterCharge
      );
      const sum = amountArr?.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue?.amount ||
            currentValue?.package?.amount ||
            currentValue?.commissionAmount ||
            currentValue?.amountAfterCharge),
        initialValue
      );
      setTotalAmount(sum);
    }
  }, [data]);

  return (
    <div className={`ss-trade_sectiontable_wrapper ${wrapperClassName}`}>
      {adminBalance && (
        <CardLayout className="admin__balance__area">
          <div className="admin__balance">
            <h2 className="usdt_balance">
              USDT Balance:{" "}
              {adminBalance?.usdtBalance?.data
                ? parseFloat(adminBalance?.usdtBalance?.data).toFixed(4)
                : 0}{" "}
              USDT
            </h2>
            <h2>
              BNB Balance:{" "}
              {adminBalance?.bnbBalance?.data
                ? parseFloat(adminBalance?.bnbBalance?.data).toFixed(4)
                : 0}{" "}
              BNB
            </h2>
          </div>
        </CardLayout>
      )}

      <CardLayout style={cardStyle} className="ss-trade_sectiontable_card">
        <div className="ss-trade_sectiontable_title">
          <div className="ss-trade_sectiontable_title_container">
            <h2>{sectionTableTitle}</h2>
            {addGiftAllUser && (
              <Button
                className="ss-trade_giftAllButton"
                type="button"
                onClick={() => addGiftAllUser()}
                // hidden={lastDay}
                disabled={!(toDay === lastDay || toDay === firstDay)}
                style={{
                  display:
                    toDay === lastDay || toDay === firstDay
                      ? "inline-block"
                      : "none",
                }}
              >
                Gift Send To All
              </Button>
            )}
          </div>
          <div className="left">
            {sendAll && (
              <Button onClick={sendAll} className="send-all">
                Send All
              </Button>
            )}

            {loginUserData?.data?.role === userRole.ADMIN &&
              totalAmount > 0 && (
                <div className="searchbar_input">₹{totalAmount}</div>
              )}

            {/* search filter */}
            {loginUserData?.data?.role === userRole.ADMIN && data && (
              <CSVLink
                style={{ marginLeft: "10px" }}
                className="downloadCSV_button"
                data={data}
                headers={headers}
                filename={"sst.csv"}
              >
                <Button className="downloadCSV_button">Download Data</Button>
              </CSVLink>
            )}
            {data && setFilterData && (
              <div className="searchbar_input">
                <Input
                  type="text"
                  name="search"
                  className="spacial_search_input"
                  placeholder="Search user id"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            )}

            {loginUserData?.data?.role === userRole.ADMIN && (
              <Button
                className="filter_button"
                onClick={() => setShowModal(true)}
              >
                Filter
              </Button>
            )}
            {loginUserData?.data?.role === userRole.ADMIN && (
              <Button
                className="filter_button"
                onClick={() => {
                  setDate([
                    {
                      startDate: new Date(),
                      endDate: null,
                      key: "selection",
                    },
                  ]);
                  setSearch("");
                  setFilterData([]);
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        {dataTeam && (
          <LevelTeamFilter
            setAllTeamSearch={setAllTeamSearch}
            dataTeam={dataTeam}
          />
        )}
        <div className="ss-trade_sectiontable_table">{table}</div>
        {calculateContainer && (
          <div className="ss-trade_sectiontable_calculate">
            {calculateCredit && (
              <h2 className="credit_balance">{calculateCredit}</h2>
            )}
            {calculateDebit && (
              <h2 className="debit_balance">{calculateDebit}</h2>
            )}
          </div>
        )}
      </CardLayout>

      <Modal
        modalRef={modalRef}
        setOpenModal={setShowModal}
        openModal={showModal}
      >
        {" "}
        <DateRangePicker
          onChange={(item) => setDateState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={dateState}
          direction="horizontal"
        />
      </Modal>
    </div>
  );
};

export default SectionCommonTable;
