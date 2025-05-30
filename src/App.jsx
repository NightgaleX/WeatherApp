import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCloudSun,
  faCloud,
  faSun,
  faCloudBolt,
  faSnowflake,
  faCloudMoon,
  faCloudMoonRain,
  faCloudSunRain,
  faCloudRain,
  faCloudShowersHeavy,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCloudSun,
  faCloud,
  faSun,
  faCloudBolt,
  faSnowflake,
  faCloudMoon,
  faCloudMoonRain,
  faCloudSunRain,
  faCloudRain,
  faCloudShowersHeavy,
  faMoon
);

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

function WeatherIcon({ weather }) {
  if (!weather || !weather.description) return null;

  if (weather.description === "Sunny") {
    return <FontAwesomeIcon icon="sun" />;
  } else if (weather.description === "Partly cloudy") {
    return <FontAwesomeIcon icon="cloud-sun" />;
  } else if (weather.description === "Cloudy") {
    return <FontAwesomeIcon icon="cloud" />;
  } else if (weather.description === "Light drizzle") {
    return <FontAwesomeIcon icon="cloud-rain" />;
  } else if (weather.description === "Lightning") {
    return <FontAwesomeIcon icon="cloud-bolt" />;
  } else if (weather.description === "Snowy") {
    return <FontAwesomeIcon icon="snowflake" />;
  } else if (weather.description === "Clear") {
    return <FontAwesomeIcon icon="moon" />;
  } else {
    return <FontAwesomeIcon icon="cloud-showers-heavy" />;
  }
}

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
          <p>
            Description: <WeatherIcon weather={weather} /> {weather.description}
          </p>
        </div>
      )}
      {weather && (
        <div>
          <div className="forecastBox">
            {/*tomorrow*/}
            <WeatherIcon weather={weather} />
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            {/*Day after tomorrow*/}
            <WeatherIcon weather={weather} />
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            {/*Day after that day*/}
            <WeatherIcon weather={weather} />
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
