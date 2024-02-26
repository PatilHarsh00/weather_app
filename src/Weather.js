import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";

export default function Weather() {
  const api_key = "a0bd62f2358e26bbc6bdea1fd705d0d3"; // move to constant js
  const [city, setCity] = useState("")
  const [cardInfo, setCardInfo] = useState({
    status : 0,
    city : "",
    temp : 0,
    des : "",
    wind : 0,
    humidity : 0,
    icon : require("./assets/thunderstorm.png")
  });

  function takeInput() {
    const input = document.querySelector(".cityName");
    let cityName = formatCityName(input.value)
    setCity(cityName);
    input.value = "";
  }

  function formatCityName(city) {
    // Remove leading and trailing spaces
    city = city.trim();

    // Replace multiple spaces with a single space
    city = city.replace(/\s+/g, ' ');

    // Capitalize the first letter of each word
    city = city.toLowerCase().replace(/(^|\s)\S/g, function(firstLetter) {
        return firstLetter.toUpperCase();
    });

    // Remove any symbols
    city = city.replace(/[^\w\s]/g, '');

    return city;
  }

  const getWeatherIcon = (id) => {  // use arror function get 
    if(200 <= id && id<233){
      return require("./assets/thunderstorm.png"); // use object 
    }
    else if(300 <= id && id<322){
      return require("./assets/drizzle.png");
    }
    else if(500<=id && id<532){
      return require("./assets/rain.png")
    }
    else if(600<=id && id<623){
      return require("./assets/snow.png")
    }
    else if(id === 800){
      return require("./assets/clear.png")
    }
    else if(801<=id && id<805){
      return require("./assets/cloud.png")
    }
    else{
      return require("./assets/atmosphare.png")      
    }
  }

  async function getWeather() {
    try {
      if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        if(data.cod === 200 && data.weather[0]){
          setCardInfo(prevCard => ({
            ...prevCard,
            status : data.cod,
            city : data.name,
            temp : data.main.temp,
            des : data.weather[0].main,
            wind : data.wind.speed,
            humidity : data.main.humidity,
            icon : getWeatherIcon(response.data.weather[0].id)
          }))
        }

      }
    } catch (error) {
      if (error.response) {
        // If there is a response, set the status to the error status code
        setCardInfo(prevCard => ({
          ...prevCard,
          status: error.response.status
        }));
      } else {
        // If there is no response, set a default error status
        setCardInfo(prevCard => ({
          ...prevCard,
          status: -1 // or any other default value you prefer
        }));
      }
    }
  }
  // console.log(cardInfo.status)
  useEffect(() => {
    if (city) {
      getWeather();
    }
  }, [city, getWeather]);

  return (
    <div>
      <div className="searchPanel">
        <input 
          placeholder="City" 
          className="cityName"
          onKeyDown={(e) => {
            if(e.key === 'Enter') takeInput();
          }} 
        />
        <button onClick={takeInput} className="searchButton">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div> 
        {cardInfo.status === 200 && <WeatherCard cardInfo = {cardInfo}/>}
        {cardInfo.status === 404 && <div className="weatherCard">
            <div className="notFound">
              <h1>City Not Found</h1>
            </div>
          </div>}
    </div>
  );
}