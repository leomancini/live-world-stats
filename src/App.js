import React from "react";
import styled from "styled-components";
import {
  ContinuousCounter,
  DailyCounter,
  YearlyCounter
} from "./components/Counters";

const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 0.75fr 0.75fr;
  height: 100vh;
  width: 100vw;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #000;
  font-family: "Space Mono", monospace;
`;

const BottomRow = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111111;
  border-radius: 1rem;
  padding: 1rem;
  gap: 0.75rem;
  grid-column: ${(props) => (props.$large ? "span 1" : "span 1")};
  grid-row: ${(props) => (props.$large ? "span 1" : "span 1")};
`;

const Icon = styled.i`
  font-size: ${(props) => (props.$large ? "2.75rem" : "2rem")};
  color: #666;
  display: block;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CounterLabel = styled.div`
  font-size: ${(props) => (props.$large ? "1.75rem" : "1.25rem")};
  color: #888;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  margin-top: 0.25rem;
`;

const CounterValue = styled.span`
  font-size: ${(props) => (props.$large ? "3rem" : "2.5rem")};
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.05em;
  text-align: center;
`;

function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      <Page>
        {/* Large top counters */}
        <CounterContainer $large>
          <Icon $large className="fas fa-earth" />
          <CounterValue $large>
            <ContinuousCounter
              ratePerSecond={2.6}
              formatFn={(value) => Math.floor(value).toLocaleString()}
              baselineValue={8218391465}
              baselineTimestamp={new Date("2025-04-20T22:47:00").getTime()}
            />
          </CounterValue>
          <CounterLabel $large>World Population</CounterLabel>
        </CounterContainer>
        <CounterContainer $large>
          <Icon $large className="fas fa-wifi" />
          <CounterValue $large>
            <ContinuousCounter
              ratePerSecond={17.7}
              formatFn={(value) => Math.floor(value).toLocaleString()}
              baselineValue={6621379726}
              baselineTimestamp={new Date("2025-04-20T22:47:00").getTime()}
            />
          </CounterValue>
          <CounterLabel $large>Internet Users</CounterLabel>
        </CounterContainer>
        <BottomRow>
          <CounterContainer>
            <Icon className="fas fa-cake-candles" />
            <CounterValue>
              <DailyCounter
                ratePerSecond={4.3}
                formatFn={(value) => Math.floor(value).toLocaleString()}
                baselineValue={345420}
                baselineTimestamp={new Date("2025-04-20T22:51:00").getTime()}
              />
            </CounterValue>
            <CounterLabel>Births Today</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-search" />
            <CounterValue>
              <DailyCounter
                ratePerSecond={138378}
                formatFn={(value) => Math.floor(value).toLocaleString()}
                baselineValue={11466645502}
                baselineTimestamp={new Date("2025-04-20T22:51:00").getTime()}
              />
            </CounterValue>
            <CounterLabel>Google Searches Today</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-envelope" />
            <CounterValue>
              <DailyCounter
                ratePerSecond={3667400}
                formatFn={(value) => Math.floor(value).toLocaleString()}
                baselineValue={301896423861}
                baselineTimestamp={new Date("2025-04-20T22:52:00").getTime()}
              />
            </CounterValue>
            <CounterLabel>Emails Sent Today</CounterLabel>
          </CounterContainer>
        </BottomRow>
        <BottomRow>
          <CounterContainer>
            <Icon className="fas fa-cloud" />
            <CounterValue>
              <YearlyCounter
                ratePerSecond={1271}
                formatFn={(value) => Math.floor(value).toLocaleString()}
                baselineValue={11902970505}
                baselineTimestamp={new Date("2025-04-20T22:48:00").getTime()}
              />
            </CounterValue>
            <CounterLabel>Co2 Emissions This Year (t)</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-laptop" />
            <CounterValue>
              <YearlyCounter
                ratePerSecond={9.7}
                formatFn={(value) => Math.floor(value).toLocaleString()}
                baselineValue={68663542}
                baselineTimestamp={new Date("2025-04-20T22:50:00").getTime()}
              />
            </CounterValue>
            <CounterLabel>Computers Made This Year</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-droplet" />
            <CounterValue>
              <YearlyCounter
                ratePerSecond={1.7}
                formatFn={(value) => Math.floor(value).toLocaleString()}
                baselineValue={1417580884}
                baselineTimestamp={new Date("2025-04-20T22:50:00").getTime()}
              />
            </CounterValue>
            <CounterLabel>Water Used This Year (Mℓ)</CounterLabel>
          </CounterContainer>
        </BottomRow>
      </Page>
    </>
  );
}

export default App;
