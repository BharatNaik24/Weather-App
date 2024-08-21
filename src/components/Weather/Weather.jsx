import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

import "./Weather.css";
import FiveDaysPredictions from "../FiveDaysPredictions/FiveDaysPredictions";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const weatherImgaes = {
  Clouds: "./public/images/clouds.png",
  Clear: "./public/images/clear.png",
  Rain: "./public/images/rain.png",
  Drizzle: "./public/images/drizzle.png",
  Mist: "./public/images/mist.png",
  Snow: "./public/images/snow.png",
  Thunderstorm:
    "https://cdn0.iconfinder.com/data/icons/weather-and-season-3d-pack/512/Rain_Thunderstrom_at_Night.png",
  Haze: "https://files.softicons.com/download/web-icons/android-weather-icons-by-bharath-prabhuswamy/png/512x512/Haze.png",
  default: "./public/images/clear.png",
};

function Weather() {
  const [cityName, setCityName] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const onChangeInput = (event) => {
    setCityName(event.target.value);
  };

  const getData = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=0c65cf51708626a7e1cf39e0738c483b`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setApiStatus(apiStatusConstants.success);
      console.log(data);
    } catch (error) {
      console.error(error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const imageValue = () => {
    switch (weatherData.weather[0].main) {
      case "Clouds":
        return weatherImgaes.Clouds;
      case "Clear":
        return weatherImgaes.Clear;
      case "Rain":
        return weatherImgaes.Rain;
      case "Drizzle":
        return weatherImgaes.Drizzle;
      case "Mist":
        return weatherImgaes.Mist;
      case "Snow":
        return weatherImgaes.Snow;
      case "Haze":
        return weatherImgaes.Haze;
      case "Thunderstorm":
        return weatherImgaes.Thunderstorm;
      default:
        return weatherImgaes.Clear;
    }
  };

  useEffect(() => {
    if (cityName) {
      getData();
    }
  }, []);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  const converCelsiusToFaranite = (value) => {
    return (value * 9) / 5 + 32;
  };

  const onSearchClick = () => {
    getData();
  };

  const renderSuccessView = () => {
    const tempCelsius = weatherData.main.temp;
    const tempFaranite = converCelsiusToFaranite(tempCelsius);

    return (
      <div className="iconsAndLocation">
        <img src={imageValue()} alt="weather icon" className="weatherIcon" />
        {weatherData && weatherData.weather && (
          <p className="tempTitle">{weatherData.weather[0].main}</p>
        )}
        <h1 className="temparature">
          {Math.round(weatherData.main.temp)}°<span className="span">C</span> /{" "}
          <span></span>
          {Math.round(tempFaranite)}°<span className="span">F</span>
        </h1>
        <h1 className="searchLocation">{weatherData.name}</h1>
        <div className="humidandWindSpeedContainer">
          <div className="humidContainer">
            <img
              src="/public/images/humidity.png"
              alt="humidity"
              className="humidityIcon"
            />
            <div>
              <p className="props">{weatherData.main.humidity}%</p>
              <p className="props">Humidity</p>
            </div>
          </div>

          <div className="speedContainer">
            <img
              src="/public/images/wind.png"
              alt="windSpeed"
              className="speedIcon"
            />
            <div>
              <p className="props">{weatherData.wind.speed} Km/hr</p>
              <p className="props">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="iconsAndLocation">
        <h1>City not found</h1>
      </div>
    );
  };

  const renderLoadingView = () => (
    <div className="iconsAndLocation">
      <Circles
        height="50"
        width="50"
        color="#3498db"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );

  const renderWeatherInfo = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="mainBgContainer">
      <div className="searchBarContainer">
        <div className="iconswithSearch">
          <input
            type="text"
            id="searchInput"
            placeholder="Enter City Name"
            className="searchBox"
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
          />
          <button className="searchButton" onClick={onSearchClick}>
            <img
              src="./public/images/search.png"
              alt="searchIcon"
              className="searchIcon"
            />
          </button>
        </div>
        {renderWeatherInfo()}
        <FiveDaysPredictions cityName={cityName} />
      </div>
    </div>
  );
}

export default Weather;
