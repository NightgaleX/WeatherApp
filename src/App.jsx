import { useState, useEffect } from "react";
import "./App.css";

function WeatherFetcher() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");

  const getWeatherData = async () => {
    setSearchedCity(city);
    
    const res = await fetch(`http://goweather.xyz/weather/${city}`);
    const data = await res.json();

    setWeather(data);
    console.log(city);
  };

  return (
<>
    <WeatherRenderer
      city={city}
      newCity={setCity}
      onSearch={getWeatherData}
      weather={weather}
    />
    <CityImage city={searchedCity} />
  </>
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

function CityImage({ city }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchCityImage = async () => {

      const accessKey = import.meta.env.VITE_UNSPLASH_KEY;
      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`);

        const data = await res.json();
        const image = data.results[0]?.urls?.regular;
        setImageUrl(image || null);
      } catch (error) {
        console.error("Error, could not get image:", error);
        setImageUrl(null);
      }
    };
    fetchCityImage();
  }, [city]);

  if (!imageUrl) return null;

  return (
    <div>
      <img src={imageUrl} alt={city} />
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