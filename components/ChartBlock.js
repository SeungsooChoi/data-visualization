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
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1.375rem;
  border-radius: 0.75rem;
  border: 0.0625rem solid #ced4da;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ChartBlock = ({
  days: {
    response: {
      body: {
        items: { item },
      },
    },
  },
}) => {
  const canvasDom = useRef();

  useEffect(() => {
    const covidArr = item.sort((a, b) => a.stateDt - b.stateDt);
    const stateDt = covidArr.map((day) =>
      formatDate(day.createDt.split(" ")[0])
    );
    const decideCnt = covidArr.map((day) => day.decideCnt);
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

  return (
    <Wrapper>
      <Title>
        <label>일별 누적 확진자 수</label>
      </Title>
      <canvas ref={canvasDom}></canvas>
    </Wrapper>
  );
};

export default ChartBlock;
