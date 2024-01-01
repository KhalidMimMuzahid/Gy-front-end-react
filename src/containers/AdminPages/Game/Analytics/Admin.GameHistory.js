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
        name: "",
        data: [
          {
            x: "15",
            y: 15,
            fillColor: "#FF0000",
            goals: [
              {
                name: ["name", "age"],
                value: 1400,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "25",
            y: 4432,
            fillColor: "#008000",
            goals: [
              {
                name: "",
                value: 5400,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "30",
            y: 5423,
            fillColor: "#7F00FF",
            goals: [
              {
                name: "",
                value: 5200,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "48",
            y: 20,
            goals: [
              {
                name: "",
                value: 200,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 8133,
            goals: [
              {
                name: "",
                value: 6600,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "36",
            y: 7132,
            goals: [
              {
                name: "",
                value: 7500,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "78",
            y: 7332,
            goals: [
              {
                name: "",
                value: 8700,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 6553,
            goals: [
              {
                name: "",
                value: 7300,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 6553,
            goals: [
              {
                name: "",
                value: 7300,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 6553,
            goals: [
              {
                name: "",
                value: 7300,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 6553,
            goals: [
              {
                name: "",
                value: 7300,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 6553,
            goals: [
              {
                name: "",
                value: 7300,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          },
          {
            x: "47",
            y: 6553,
            goals: [
              {
                name: "",
                value: 7300,
                strokeHeight: 5,
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
            console.log("barIndex", e);
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
        },
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
        },
        formatter: function (val) {
          return val; // Display data value as label
        },
      },
      yaxis: {
        categories: [
          "",
          "",
          "",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
        ],
        labels: {
          show: true,
        },
      },
      legend: {
        show: false,
        showForSingleSeries: true,
        customLegendItems: ["Actual", "Expected"],
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
