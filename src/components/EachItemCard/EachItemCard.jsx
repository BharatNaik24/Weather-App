import "./EachItemCard.css";

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
          <p className="condition">{item.weather[0].main}</p>

          <div className="dropletIcons">
            <img
              src="https://cdn0.iconfinder.com/data/icons/weather-web-app-ui-colored/100/weather-07-512.png"
              alt="Humidity icon"
              className="droplet"
            />
            <div>
              <p className="date">{item.main.humidity}%</p>
              <p className="date1">{Math.round(item.main.temp)}°C</p>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default EachItemCard;
