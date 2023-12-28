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
  gameHistory,
  status,
  setStatus,
}) => {
  const colors = [
    "--Select--",
    "red+violet-1",
    "red-2",
    "green-3",
    "red-4",
    "green-5",
    "red+violet-6",
    "red-7",
    "green-8",
    "red-9",
    "green-10",
  ];
  const result = ["--Select--", "Win", "Lose"];
  const [showModal, setShowModal] = useState(false);
  const { data: loginUserData } = useGetLoginUserQuery();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: "",
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (loginUserData?.data?.role === userRole.ADMIN) {
      setDate(state);
    }
  }, [state]);

  useEffect(
    () => {
      if (data) {
        console.log("Data received:", data);
        const filteredData = data.filter((dt) => {
          const searchLowerCase = search?.toLowerCase();
          const userIdIncludes = dt?.userId
            ?.toLowerCase()
            .includes(searchLowerCase);
          const fullNameIncludes = dt?.fullName
            ?.toLowerCase()
            .includes(searchLowerCase);
          const sponsorIdMatches =
            dt?.sponsor_id?.toLowerCase() === searchLowerCase;
          const emailIncludes = dt?.email
            ?.toLowerCase()
            .includes(searchLowerCase);

          return (
            userIdIncludes ||
            fullNameIncludes ||
            sponsorIdMatches ||
            emailIncludes
          );
        });

        console.log("filterdata: ", filteredData);

        // Ensure filteredData is not empty before setting it
        if (filteredData.length > 0) {
          setFilterData(filteredData);
        } else {
          // If no search matches, set filterData back to original data
          setFilterData(data);
        }
      }
    },
    // [data, search] // if i set data as a dependencies, then this useEffect hook is falling to loop hole
    [search]
  );

  const searchFunction = () => {
    if (data) {
      const filterData = data?.filter((dt) => {
        if (search === "") {
          return dt;
        } else if (
          dt?.userId?.toLowerCase()?.includes(search?.toLowerCase()) ||
          dt?.fullName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          dt?.sponsor_id?.toLowerCase() === search?.toLowerCase() ||
          dt?.email?.toLowerCase()?.includes(search?.toLowerCase()) === search
        ) {
          return dt;
        }
      });
      console.log("filterdata: ", filterData);
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
    if (date?.length > 0 && search) {
      dateandSearchFunct();
    } else if (date?.length > 0) {
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
              totalAmount !== 0 && (
                <div className="searchbar_input">₹{totalAmount}</div>
              )}

            {/* search filter */}
            {loginUserData?.data?.role === userRole.ADMIN &&
              data &&
              !gameHistory && (
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
            {data && setFilterData && !gameHistory && (
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

            {loginUserData?.data?.role === userRole.ADMIN && !gameHistory && (
              <Button
                className="filter_button"
                onClick={() => setShowModal(true)}
              >
                Filter
              </Button>
            )}
            {loginUserData?.data?.role === userRole.ADMIN && !gameHistory && (
              <Button
                className="filter_button"
                onClick={() => {
                  setDate([
                    {
                      startDate: new Date(),
                      endDate: "",
                      key: "selection",
                    },
                  ]);
                  setSearch("");
                  setFilterData(data);
                }}
              >
                Reset
              </Button>
            )}

            {/* color game history filter */}
            {loginUserData?.data?.role === userRole.ADMIN && gameHistory && (
              <>
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
                <div className="selectOption__row">
                  <select
                    name="status"
                    defaultValue={"--Select--"}
                    style={{
                      border: "none",
                      outline: "none",
                      padding: "9px 8px",
                      borderRadius: "5px 0px 0px 5px",
                      textTransform: "capitalize",
                      // marginTop: "-10px",
                      border: "1px solid #ccc",
                      background: "#fff",
                    }}
                    // value={rowData?.role}
                    // onChange={(e) => handleChange("role", e.target.value)}
                  >
                    {colors?.map((d, i) => (
                      <option value={d} key={i + 1}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="selectOption__row">
                  <select
                    name="status"
                    defaultValue={"--Select--"}
                    style={{
                      border: "none",
                      outline: "none",
                      padding: "9px 8px",
                      borderRadius: "5px 0px 0px 5px",
                      textTransform: "capitalize",
                      // marginTop: "-10px",
                      border: "1px solid #ccc",
                      background: `--var(bg-body)`,
                    }}
                    // value={rowData?.role}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {result?.map((d, i) => (
                      <option value={d} key={i + 1}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
        {status && (
          <p style={{ fontSize: "14px", paddingBottom: "10px" }}>
            Total Users: 30, Total Winning Amount: $500, Total Betting Amount:
            $150
          </p>
        )}
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

      {showModal && (
        <Modal
          modalRef={modalRef}
          setOpenModal={setShowModal}
          openModal={showModal}
        >
          {" "}
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
        </Modal>
      )}
    </div>
  );
};

export default SectionCommonTable;
