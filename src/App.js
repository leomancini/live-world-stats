import React from "react";
import styled from "styled-components";
import { LiveCounter } from "./components/LiveCounter";

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
            <LiveCounter
              timestamp1={1744945110}
              value1={8217817508}
              timestamp2={1744945127}
              value2={8217817547}
              formatFn={(value) => Math.floor(value).toLocaleString()}
            />
          </CounterValue>
          <CounterLabel $large>World Population</CounterLabel>
        </CounterContainer>
        <CounterContainer $large>
          <Icon $large className="fas fa-wifi" />
          <CounterValue $large>
            <LiveCounter
              timestamp1={1744947692}
              value1={6617320309}
              timestamp2={1744947695}
              value2={6617320362}
              formatFn={(value) => Math.floor(value).toLocaleString()}
            />
          </CounterValue>
          <CounterLabel $large>Internet Users</CounterLabel>
        </CounterContainer>
        <BottomRow>
          <CounterContainer>
            <Icon className="fas fa-cake-candles" />
            <CounterValue>
              <LiveCounter
                timestamp1={1744947624}
                value1={357825}
                timestamp2={1744947630}
                value2={357849}
                formatFn={(value) => Math.floor(value).toLocaleString()}
              />
            </CounterValue>
            <CounterLabel>Births Today</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-search" />
            <CounterValue>
              <LiveCounter
                timestamp1={1744946325}
                value1={11682371731}
                timestamp2={1744946332}
                value2={11683305182}
                formatFn={(value) => Math.floor(value).toLocaleString()}
              />
            </CounterValue>
            <CounterLabel>Google Searches Today</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-envelope" />
            <CounterValue>
              <LiveCounter
                timestamp1={1744946305}
                value1={307608720706}
                timestamp2={1744946315}
                value2={307608721001}
                formatFn={(value) => Math.floor(value).toLocaleString()}
              />
            </CounterValue>
            <CounterLabel>Emails Sent Today</CounterLabel>
          </CounterContainer>
        </BottomRow>
        <BottomRow>
          <CounterContainer>
            <Icon className="fas fa-cloud" />
            <CounterValue>
              <LiveCounter
                timestamp1={1744946340}
                value1={11579290043}
                timestamp2={1744946350}
                value2={11579302750}
                formatFn={(value) => Math.floor(value).toLocaleString()}
              />
            </CounterValue>
            <CounterLabel>Co2 Emissions This Year (t)</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-laptop" />
            <CounterValue>
              <LiveCounter
                timestamp1={1744946685}
                value1={66814905}
                timestamp2={1744946693}
                value2={66814963}
                formatFn={(value) => Math.floor(value).toLocaleString()}
              />
            </CounterValue>
            <CounterLabel>Computers Made This Year</CounterLabel>
          </CounterContainer>
          <CounterContainer>
            <Icon className="fas fa-droplet" />
            <CounterValue>
              <LiveCounter
                timestamp1={1744945110}
                value1={1379006001}
                timestamp2={1744946612}
                value2={1379007538}
                formatFn={(value) => Math.floor(value).toLocaleString()}
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
