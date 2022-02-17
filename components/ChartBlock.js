import React, { useEffect, useRef } from "react";
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { formatDate } from "../util";

const ChartBlock = ({ data }) => {
  // const coronaArray = data;

  let coronaArray = data.sort((a, b) => a.stateDt - b.stateDt);
  coronaArray = coronaArray.slice(0, 7);
  // const zz = data.reduce((acc, cur) => acc.stateDt - cur.stateDt);
  // console.log(zz);
  const canvasDom = useRef();
  console.log(coronaArray);
  const stateDt = coronaArray.map((day) =>
    formatDate(day.createDt.split(" ")[0])
  );
  console.log(stateDt);
  const decideCnt = coronaArray.map((day) => day.decideCnt);

  useEffect(() => {
    const ctx = canvasDom.current.getContext("2d");

    Chart.register(LineController, LineElement, PointElement, LinearScale);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: stateDt,
        datasets: [
          {
            label: "case",
            data: decideCnt,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            axis: "x",
          },
        },
      },
    });
  }, []);

  return <canvas ref={canvasDom}></canvas>;
};

export default ChartBlock;
