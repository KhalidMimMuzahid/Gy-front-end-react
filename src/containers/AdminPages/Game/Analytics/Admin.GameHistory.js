import React, { useState } from "react";
import SectionCommonTable from "../../../../components/SectionCommonTable";
import GameHistoryTable from "./table/GameHistoryTable";

const AdminGameHistory = () => {
  const [status, setStatus] = useState("");
  // if (false) {
  //   return <Loading />;
  // }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Game History`}
        data={[]}
        setFilterData={() => {}}
        gameHistory={true}
        status={status}
        setStatus={setStatus}
        table={<GameHistoryTable data={[]} />}
      />
    </>
  );
};

export default AdminGameHistory;
