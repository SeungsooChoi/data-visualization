import React, { useEffect, useRef } from "react";
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { formatDate } from "../util";

const ChartBlock = ({ data }) => {
  let coronaArray = data.sort((a, b) => a.stateDt - b.stateDt);
  const canvasDom = useRef();
  const stateDt = coronaArray.map((day) =>
    formatDate(day.createDt.split(" ")[0])
  );
  const decideCnt = coronaArray.map((day) => day.decideCnt);

  useEffect(() => {
    const ctx = canvasDom.current.getContext("2d");

    Chart.register(
      CategoryScale,
      LineController,
      LineElement,
      PointElement,
      LinearScale
    );

    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            data: decideCnt,
            borderColor: "rgb(54, 162, 235)",
          },
        ],
        labels: stateDt,
      },
    });
  }, []);

  return <canvas ref={canvasDom}></canvas>;
};

export default ChartBlock;
