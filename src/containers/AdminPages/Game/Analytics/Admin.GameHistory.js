import React from "react";
import SectionCommonTable from "../../../../components/SectionCommonTable";
import GameHistoryTable from "./table/GameHistoryTable";

const AdminGameHistory = () => {
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
        table={<GameHistoryTable data={[]} />}
      />
    </>
  );
};

export default AdminGameHistory;
