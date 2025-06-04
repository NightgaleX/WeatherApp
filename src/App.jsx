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
  const [searchedCity, setSearchedCity] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const getWeatherData = async () => {
    const cityName = city.toLowerCase();
    setSearchedCity(city);

    const cachedData = localStorage.getItem(`weather_${cityName}`);
    if (cachedData) {
      console.log("Using cached data for:", city);
      setWeather(JSON.parse(cachedData));
      return;
    }

    try {
      const res = await fetch(`http://goweather.xyz/weather/${city}`);
      const data = await res.json();
      setWeather(data);

      localStorage.setItem(`weather_${cityName}`, JSON.stringify(data));
      console.log("Weather data fetched for:", city);

    } catch (error) {
      console.error("Error, could not get weather:", error);
      setWeather("");
    }
    console.log(city);

  };

  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    } else {
      document.body.style.backgroundImage = "";

    }
  }, [backgroundImage]);

  return (
    <>
      <WeatherRenderer
        city={city}
        newCity={setCity}
        onSearch={getWeatherData}
        weather={weather}
      />
      <CityImage city={searchedCity} cityImage={setBackgroundImage} />
    </>
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

      <div>
        {weather ? (
          <div>
            {Array.isArray(weather.forecast) && weather.forecast.length > 0 ? (
              <div id="forecasts">
                {weather.forecast.map((day, index) => (
                  <div id="forecastBoxes" key={index}>
                    <p>Day {day.day}</p>
                    <WeatherIcon weather={weather} />
                    <p>{day.temperature}</p>
                    <p>{day.wind}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No forecast data available</p>
            )}
          </div>
        ) : (
          <p>Loading or no data available...</p>
        )}
      </div>
    </div>
  );
}

function CityImage({ city, cityImage }) {
  useEffect(() => {
    if (!city) return;

    const cityPicture = city.toLowerCase();
    const cachedImage = localStorage.getItem(`bgimg_${cityPicture}`);
    if (cachedImage) {
      console.log("Using cached image:", cityPicture);
      cityImage(cachedImage);
      return;
    }

    const fetchCityImage = async () => {
      const accessKey = import.meta.env.VITE_UNSPLASH_KEY;

      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`);
        const data = await res.json();
        const imageUrl = data.results[0]?.urls?.regular;
        
        if (imageUrl) {
          const imageRes = await fetch(imageUrl);
          const blob = await imageRes.blob();

          const reader = new FileReader();
          reader.onloadend = () => {
          const base64 = reader.result;
          localStorage.setItem(`bgimg_${cityPicture}`, base64);
          cityImage(base64);
        };
        reader.readAsDataURL(blob);
      } else {
        console.error("No image found for city:", city);}
        cityImage("");

      } catch (error) {
        console.error("Error, could not get image:", error);
        cityImage("");
      }
    };
    fetchCityImage();
  }, [city, cityImage]);

  return null;
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

document.querySelector('form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.querySelector('#cityInput').value;
  const weather = await getWeatherData(city);

  if (weather) {
    document.querySelector('#output').innerHTML = `
      <p>Temperature: ${weather.temperature}</p>
      <p>Wind: ${weather.wind}</p>
      <p>Description: ${weather.description}</p>
    `;
  }
});

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
