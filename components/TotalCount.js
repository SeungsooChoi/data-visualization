import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  margin-bottom: 1.375rem;
  border-radius: 0.75rem;
  border: 0.0625rem solid #ced4da;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

const TodayBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 1.125rem;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #495057;

    .title {
      margin-bottom: 0.0625rem;
      font-size: 0.8125rem;
      opacity: 0.9;
      color: #495057;
    }

    .count {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .diff {
      padding: 0.09375rem 0.875rem;
      border-radius: 1.125rem;
    }

    .diff.decide {
      color: #fa5252;
      background: #ffdeeb;
    }
    .diff.death {
      color: #495057;
      background: #f1f3f5;
    }
  }
  .item.red {
    color: #ff6b6b;
  }
`;

const TotalCount = ({ days }) => {
  const covidArr = days.response.body.items.item;
  const todayCount = covidArr[0];
  const getDiffDecideCnt = (today, yesterDay) =>
    Number(today.decideCnt) - Number(yesterDay.decideCnt);
  const getDiffDeathCnt = (today, yesterDay) =>
    Number(today.deathCnt) - Number(yesterDay.deathCnt);
  const diffTodayDecideCnt = getDiffDecideCnt(covidArr[0], covidArr[1]);
  const diffTodayDeathCnt = getDiffDeathCnt(covidArr[0], covidArr[1]);

  return (
    <Section>
      <TodayBlock>
        <div className="item red">
          <div className="title">확진자</div>
          <div className="count">
            {todayCount.decideCnt.toLocaleString("ko-KR")}
          </div>
          <div className="diff decide">
            <div>{diffTodayDecideCnt.toLocaleString("ko-KR")} &uarr;</div>
          </div>
        </div>
        <div className="item">
          <div className="title">사망자</div>
          <div className="count">
            {todayCount.deathCnt.toLocaleString("ko-KR")}
          </div>
          <div className="diff death">
            <div>{diffTodayDeathCnt.toLocaleString("ko-KR")} &uarr;</div>
          </div>
        </div>
      </TodayBlock>
    </Section>
  );
};

export default TotalCount;
