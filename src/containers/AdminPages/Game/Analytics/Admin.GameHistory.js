import React, { useState } from "react";
import SectionCommonTable from "../../../../components/SectionCommonTable";
import GameHistoryTable from "./table/GameHistoryTable";
import ReactApexChart from "react-apexcharts";
import CardLayout from "../../../../components/CardLayout";

const AdminGameHistory = () => {
  const [status, setStatus] = useState("");

  const chartData = {
    series: [
      {
        name: "Actual",
        data: [
          {
            x: "2011",
            y: 2000,
            fillColors: ["red", "green"],
            goals: [
              {
                name: "Expected",
                value: 1400,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2012",
            y: 4432,
            goals: [
              {
                name: "Expected",
                value: 5400,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2013",
            y: 5423,
            goals: [
              {
                name: "Expected",
                value: 5200,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2014",
            y: 6653,
            goals: [
              {
                name: "Expected",
                value: 6500,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2015",
            y: 8133,
            goals: [
              {
                name: "Expected",
                value: 6600,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2016",
            y: 7132,
            goals: [
              {
                name: "Expected",
                value: 7500,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2017",
            y: 7332,
            goals: [
              {
                name: "Expected",
                value: 8700,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "2018",
            y: 6553,
            goals: [
              {
                name: "Expected",
                value: 7300,
                strokeHeight: 2,
                strokeDashArray: 2,
                strokeColor: "#775DD0",
              },
            ],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (_chart, _w, e) {
            console.log("barIndex", e?.dataPointIndex);
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
        },
      },
      colors: ["#00E396", "#f4f4"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
        showForSingleSeries: true,
        customLegendItems: ["Actual", "Expected"],
        markers: {
          fillColors: ["#00E396", "#775DD0"],
        },
      },
    },
  };
  return (
    <>
      <div className="game__history__wrapper">
        <CardLayout className="game__history__cardLayout">
          <div className="game__history__section__title">
            <h2>Game History</h2>
          </div>
          <div className="game__chart">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={350}
            />
          </div>
        </CardLayout>
      </div>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Game History`}
        data={[]}
        setFilterData={() => {}}
        gameHistory={false}
        status={status}
        setStatus={setStatus}
        table={<GameHistoryTable data={[]} />}
      />
    </>
  );
};

export default AdminGameHistory;
