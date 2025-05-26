import { useState } from "react";
import "./App.css";

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
      </div>
    );
  }

  export default function WeatherApp() {
    return (
        <div>
          <h1 id="header">WeatherApp</h1>
        
        <div id="container">
              <WeatherFetcher />
        </div>
          <footer className="footer">Creators: Holger - Oliver - Rasmus</footer>
        </div>
    );
  }


  
