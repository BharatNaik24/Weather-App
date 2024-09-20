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
  Clouds: "https://i.postimg.cc/C552N28D/clouds.png",
  Clear: "https://i.postimg.cc/XqgvfpwX/clear.png",
  Rain: "https://i.postimg.cc/dtBB16Tc/rain.png",
  Drizzle: "https://i.postimg.cc/1RghDgrd/drizzle.png",
  Mist: "https://i.postimg.cc/3rZpCRrg/mist.png",
  Snow: "https://i.postimg.cc/XqNrDfN9/snow.png",
  Thunderstorm: "https://i.postimg.cc/Jnsryph6/thunderstorm.png",
  Haze: "https://i.postimg.cc/wM5VFqzm/fog.png",
  default: "https://i.postimg.cc/XqgvfpwX/clear.png",
};

function Weather() {
  const [cityName, setCityName] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [unit, setUnit] = useState("Celsius");

  const onChangeInput = (event) => {
    setCityName(event.target.value);
  };

  const onUnitChange = (event) => {
    setUnit(event.target.value);
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
  }, [cityName]);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  const converCelsiusToFahrenheit = (value) => {
    return (value * 9) / 5 + 32;
  };

  const onSearchClick = () => {
    getData();
  };

  const renderSuccessView = () => {
    const tempCelsius = weatherData.main.temp;
    const tempFahrenheit = converCelsiusToFahrenheit(tempCelsius);

    const displayedTemp = unit === "Celsius" ? tempCelsius : tempFahrenheit;
    const displayedUnit = unit === "Celsius" ? "C" : "F";

    return (
      <div className="iconsAndLocation">
        <img src={imageValue()} alt="weather icon" className="weatherIcon" />
        {weatherData && weatherData.weather && (
          <p className="tempTitle">{weatherData.weather[0].main}</p>
        )}
        <h1 className="temparature">
          {Math.round(displayedTemp)}°
          <span className="span">{displayedUnit}</span>
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
      <div
        className=""
        style={{
          backgroundColor: "#e5ebc3",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
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
              src="https://i.postimg.cc/8zm61MNY/search.png"
              alt="searchIcon"
              className="searchIcon"
            />
          </button>
        </div>
        <div className="unitSelector">
          <label htmlFor="unit">Select Unit:</label>
          <select
            id="unit"
            value={unit}
            onChange={onUnitChange}
            className="unitDropdown"
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
          </select>
        </div>
        {renderWeatherInfo()}
        <FiveDaysPredictions cityName={cityName} />
      </div>
    </div>
  );
}

export default Weather;
