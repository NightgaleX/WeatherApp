import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "postcss";

function WeatherFetcher() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    const res = await fetch(`http://goweather.xyz/weather/${city}`);
    const data = await res.json();

    setWeather(data);
    console.log(city);
  };

  return (
    <WeatherRenderer
      city={city}
      newCity={setCity}
      onSearch={getWeatherData}
      weather={weather}
    />
  );
}

// function WeatherIcon({ weather }) {
//   let icon = "";
//   if (weather.description === "Partly cloudy") {
//     console.log("It works");
//     console.log(weather.description);
//     icon = <FontAwesomeIcon icon="fa-solid fa-cloud-sun" />;
//     return icon;
//   }
// }

function WeatherRenderer({ city, newCity, onSearch, weather }) {
  return (
    <div>
      <h2>rain or clear skies???</h2>
      <input
        placeholder="Enter Location"
        type="text"
        value={city}
        onChange={(e) => newCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <button onClick={onSearch}>Get Weather</button>

      {weather && (
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>Wind: {weather.wind}</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
      {weather && (
        <div>
          <div className="forecastBox">
            {/*tomorrow*/}
            {/* <WeatherIcon /> */}
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            {/*Day after tomorrow*/}
            {/* <WeatherIcon /> */}
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            {/*Day after that day*/}
            {/* <WeatherIcon /> */}
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Clock() {
  const [ctime, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h2>{ctime}</h2>;
}

export default function WeatherApp() {
  return (
    <div>
      <h1 id="header">WeatherApp</h1>
      <Clock />

      <div id="container">
        <WeatherFetcher />
      </div>
      <footer className="footer">Creators: Holger - Oliver - Rasmus</footer>
    </div>
  );
}
