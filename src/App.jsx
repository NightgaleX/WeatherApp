import { useState } from "react";
import "./App.css";

function WeatherApp() {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

  const getWAppData = async () => {
    const res = await fetch(`http://goweather.xyz/weather/${city}`);
    const data = await res.json();

    setWeather(data);
    console.log(city);
  };

  return (
    <div>
      <h2>rain or clear skies???</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getWAppData();
          }
        }}
        placeholder="test your luck"
      />
      <button onClick={getWAppData}>Try it</button>

      {weather && (
        <div>
          <div className="forecastBox">
            {/* tomorrow */}
            <p>A weather icon</p>
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            {/* Day after tomorrow */}
            <p>A weather icon</p>
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            {/* Day after that day */}
            <p>A weather icon</p>
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

/*{weather && (
        <div>
          <div className="forecastBox">
            { tomorrow }
            <p>A weather icon</p>
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            { Day after tomorrow }
            <p>A weather icon</p>
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
          <div className="forecastBox">
            { Day after that day }
            <p>A weather icon</p>
            <p>{weather.temperature}</p>
            <p>{weather.wind}</p>
          </div>
        </div>
      )} */
