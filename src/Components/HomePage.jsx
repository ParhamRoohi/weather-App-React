import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const icons = {
  snow: "./images/snow.png",
  storm: "./images/storm.png",
  rain: "./images/rainDrop.png",
  partlyCloudy: "./images/partlyCloudy.png",
  rainDrop: "./images/rainDrop.png",
  sunny: "./images/sunny.png",
};

const weatherDescriptions = {
  clearSky: "آسمان صاف",
  fewClouds: "چند ابر",
  brokenClouds: "ابرهای شکسته",
  rain: "بارش باران",
  thunderStorm: "طوفانی",
  snow: "برف",
  overcastClouds: "پوشیده از ابر",
  scatteredClouds: "ابر پراکنده",
};

function HomePage() {
  const [weatherData, setWeatherData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403"
      );
      const data = res.data;
      setWeatherData(data);
      setDate(
        new Date().toLocaleDateString("fa-IR") +
          " " +
          new Date().toLocaleDateString("fa-IR", { weekday: "long" })
      );
    };

    getData();
  }, []);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clouds":
        return icons.partlyCloudy;
      case "Clear":
        return icons.sunny;
      case "Rain":
        return icons.rain;
      case "Storm":
        return icons.storm;
      case "Snow":
        return icons.snow;
      case "RainDrop":
        return icons.rainDrop;
      default:
        return icons.sunny;
    }
  };

  const getWeatherDes = (description) => {
    switch (description) {
      case "scattered clouds":
        return weatherDescriptions.scatteredClouds;
      case "clear sky":
        return weatherDescriptions.clearSky;
      case "broken clouds":
        return weatherDescriptions.brokenClouds;
      case "rain":
        return weatherDescriptions.rain;
      case "thunder Storm":
        return weatherDescriptions.thunderStorm;
      case "overcast clouds":
        return weatherDescriptions.overcastClouds;
      case "snow":
        return weatherDescriptions.snow;
      case "few clouds":
        return weatherDescriptions.fewClouds;
    }
  };

  const getTodayWeatherDes = (icon, min, max, text, current) => (
    <div className="Weather-Today">
      <div>
        <img src={icon} alt="Weather icon" />
      </div>
      <p className="Temp">{Math.round(current).toLocaleString("fa-IR")}</p>
      <div className="Text">{text}</div>
      <div className="Data">
        <p>
          حداقل <sup>°</sup>
          {Math.round(min).toLocaleString("fa-IR")}
        </p>
        <p>
          حداکثر <sup>°</sup> {Math.round(max).toLocaleString("fa-IR")}
        </p>
      </div>
    </div>
  );

  const getWeatherForecastDes = (date, icon, min, max) => {
    const myDate = new Date(date);
    return (
      <div className="Weather_Widget-Day">
        <div className="Data">
          <p>{myDate.toLocaleDateString("fa-IR", { weekday: "long" })}</p>
        </div>
        <div className="Day_Icon">
          <img src={icon} alt="Weather icon" />
        </div>
        <div className="Day_Temp">
          <p>
            حداقل <sup>°</sup>
            {Math.round(min).toLocaleString("fa-IR")}
          </p>
          <p>
            حداکثر <sup>°</sup>
            {Math.round(max).toLocaleString("fa-IR")}
          </p>
        </div>
      </div>
    );
  };
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours;
  }

  function setAppTheme() {
    const element = document.body;
    const currentTime = getCurrentTime();

    if (currentTime >= 20 || currentTime < 6) {
      element.classList.add("Dark_Mode");
    } else {
      element.classList.remove("Dark_Mode");
    }
  }
  setAppTheme();
  setInterval(setAppTheme, 5 * 60 * 1000);

  const todayWeather = weatherData.find((day) => day.dateTitle === "امروز");
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <header id="Header">
        <div className="City">
          <p>تهران</p>
          <div className="Header_City-icon">
            <i className="fa fa-map-marker Header_City-icon"></i>
          </div>
        </div>
        <div className="Header_Date">
          <p id="Header_Date-Text">{date}</p>
        </div>
      </header>
      <main id="Main">
        <section id="Weather">
          {todayWeather &&
            getTodayWeatherDes(
              getWeatherIcon(todayWeather.weather.main),
              todayWeather.min,
              todayWeather.max,
              getWeatherDes(todayWeather.weather.description),
              todayWeather.current
            )}
          <div id="Weather_Widget">
            <div className="Weather_Widget-Header">
              <i className="fa fa-calendar"></i>
              <p id="Weather_Widget-Day-text">پیش بینی روز های آینده</p>
            </div>
            {weatherData.map((day) => {
              const isToday = "امروز" === day.dateTitle;
              return (
                !isToday &&
                getWeatherForecastDes(
                  day.date,
                  getWeatherIcon(day.weather.main),
                  day.min,
                  day.max
                )
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
