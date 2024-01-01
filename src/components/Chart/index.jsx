import React, { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  useLevelIncomeDataUserQuery,
  useRoiIncomeDataUserQuery,
} from "../../Services/earningApi";

const Chart = () => {
  const { data } = useLevelIncomeDataUserQuery();
  const LevelData = data?.level_income;

  // /*  ROI Income */
  const { data: roiIncome } = useRoiIncomeDataUserQuery();

  const [state, setState] = useState({
    series: [
      {
        name: "ROI",
        data: [],
      },
      {
        name: "Level ROI",
        data: [],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      chart: {
        foreColor: "orange",
        height: 350,
        type: "area",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    const createIncomeLevelData = async () => {
      /* Level ROI */
      let levelIncomeDailyTotal = [];
      let levelIncomeDailyDate = [];
      for (let i = 0; i < 9; i++) {
        let date = new Date();
        let dailyIncome = 0;
        let week = date.setDate(date.getDate() - i);
        let specificDate = new Date(week).toDateString();
        for (let j = 0; j < LevelData?.length; j++) {
          const checkingDate = new Date(LevelData[j]?.date).toDateString();
          if (specificDate === checkingDate) {
            dailyIncome += LevelData[j].amount;
          }
        }
        levelIncomeDailyTotal.push(parseFloat(dailyIncome.toFixed(4)));
        levelIncomeDailyDate.push(specificDate);
      }

      levelIncomeDailyDate.pop();

      /*  ROI Income */
      let roiIncomeDailyTotal = [];
      let roiIncomeDailyDate = [];
      for (let i = 0; i < 8; i++) {
        let date = new Date();
        let dailyIncome = 0;
        let week = date.setDate(date.getDate() - i);
        let specificDate = new Date(week).toDateString();
        for (let j = 0; j < roiIncome?.length; j++) {
          const checkingDate = new Date(roiIncome[j]?.date).toDateString();
          if (specificDate === checkingDate) {
            dailyIncome += parseFloat(roiIncome[j].amount);
          }
        }
        roiIncomeDailyTotal.push(parseFloat(dailyIncome.toFixed(4)));
        roiIncomeDailyDate.push(specificDate);
      }
      /* extra data increase */
      let date = new Date();
      let week = date.setDate(date.getDate() + 1);
      let specificDate = new Date(week).toDateString();
      roiIncomeDailyDate.unshift(specificDate);
      levelIncomeDailyDate.unshift(specificDate);

      const newObj = {
        series: [
          {
            name: "ROI",
            // data: parseInt(roiIncomeDailyTotal)?.toFixed(4),
            data: roiIncomeDailyTotal,
          },
          {
            name: "Level ROI",
            data: levelIncomeDailyTotal,
            // data: parseInt(levelIncomeDailyTotal)?.toFixed(4),
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "area",
            toolbar: {
              show: true,
              tools: {
                download: false,
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: levelIncomeDailyDate,
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
        },
      };
      await setState(newObj);
    };
    createIncomeLevelData();
  }, [LevelData, roiIncome]);

  return (
    <div id='chart'>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='area'
        height={350}
      />
    </div>
  );
};

export default Chart;
