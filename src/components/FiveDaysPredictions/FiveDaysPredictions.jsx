import { useEffect, useState } from "react";
import "./FiveDaysPredictions.css";
import EachItemCard from "../EachItemCard/EachItemCard";
import { Circles } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function FiveDaysPredictions({ cityName }) {
  const [forecastData, setData] = useState({});
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    fetchData();
  }, [cityName]);

  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.inProgress);
      const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${cityName}&appid=0c65cf51708626a7e1cf39e0738c483b`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Filter the data to get one forecast per day at 12:00 AM
      const filteredData = data.list.filter((item) => {
        return item.dt_txt.includes("00:00:00"); // Change the time if you prefer a different time slot
      });

      setData({ ...data, list: filteredData.slice() }); // Only set filtered data
      setApiStatus(apiStatusConstants.success);
      console.log(filteredData);
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
      setError(error.message);
      console.log("fetchError");
    }
  };

  const renderSuccessView = () => {
    return (
      <div className="five-days-forecast-container">
        <h2 className="container">5 Days Forecast</h2>
        <ul className="forecast-cards-container container">
          {forecastData.list.map((item) => (
            <EachItemCard key={item.dt} item={item} />
          ))}
        </ul>
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

  const renderdata = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };
  return <div>{renderdata()} </div>;
}

export default FiveDaysPredictions;
