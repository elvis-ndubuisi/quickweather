import React, { useContext } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import DataContext from "../context/DataContext";

const StyledResult = styled.section`
  min-height: 100px;
  min-width: 200px;
  background-color: var(--color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em;
  padding: 1em;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: center;
  justify-content: space-evenly;

  h2 {
    font-size: 3rem;
    margin-right: 0.4em;
  }

  h3 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const Result = () => {
  const { city } = useContext(DataContext);
  const url = `https://quickproxi.herokuapp.com/api/weather?q=${
    city || "delta"
  }&units=metric`;
  const { data, loading, message } = useFetch(url);

  return (
    <StyledResult>
      {loading ? (
        <p>{message}</p>
      ) : (
        <Flex>
          <Flex>
            <h2>
              {data.main.temp} <sup>o</sup>C
            </h2>
            <Flex column>
              <h3>{data.name}</h3>
              <p>{data.weather[0].description}</p>
            </Flex>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </Flex>
          <Flex column>
            <p>
              Pressure: <span>{data.main.pressure}</span> hPa
            </p>
            <p>
              Humidity: <span>{data.main.humidity}</span> %
            </p>
            <p>
              Wind speed: <span>{data.wind.speed}</span> m/s
            </p>
          </Flex>
        </Flex>
      )}
    </StyledResult>
  );
};

export default Result;
