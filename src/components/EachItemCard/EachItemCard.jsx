import "./EachItemCard.css";

const weatherImgaes = {
  Clouds: "./public/images/clouds.png",
  Clear: "./public/images/clear.png",
  Rain: "./public/images/rain.png",
  Drizzle: "./public/images/drizzle.png",
  Mist: "./public/images/mist.png",
  Snow: "./public/images/snow.png",
  Haze: "https://files.softicons.com/download/web-icons/android-weather-icons-by-bharath-prabhuswamy/png/512x512/Haze.png",
  default: "./public/images/clear.png",
};

function EachItemCard({ item }) {
  //assigning images as per climate
  const imageValue = () => {
    switch (item.weather[0].main) {
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
      default:
        return weatherImgaes.Clear;
    }
  };

  const formattedDate = item.dt_txt.slice(5, 10).split("-").reverse().join("-");

  return (
    <div className="eachCon">
      <li className="listItems">
        <div>
          <p className="date">{formattedDate}</p>
          <img src={imageValue()} alt="Weather icon" className="predictIcons" />
        </div>

        <div className="climateName">
          <p className="date">{item.weather[0].main}</p>

          <div className="dropletIcons">
            <img
              src="https://cdn0.iconfinder.com/data/icons/weather-web-app-ui-colored/100/weather-07-512.png"
              alt="Humidity icon"
              className="droplet"
            />
            <p className="date">{item.main.humidity}%</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default EachItemCard;
