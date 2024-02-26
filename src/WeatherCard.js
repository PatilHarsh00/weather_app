import React from 'react'

export default function WeatherCard({cardInfo }) {
    return(
        <div className="weatherCard">
          <div className="displayCity">{cardInfo.city}</div>
          <div className="displayTemp">
              <h1>{Math.round(cardInfo.temp)}°C</h1>
              <p>{cardInfo.des}</p>
          </div>
          <div className="displayWeatherInfo">
              <div className="weatherInfo">
                <div>
                  <span className="material-symbols-outlined">air</span>
                  <h2>{cardInfo.wind} km/h</h2>
                </div>
                <div>
                  <span className="material-symbols-outlined">humidity_high</span>
                  <h2>{cardInfo.humidity} %</h2>
                </div>
              </div>
              <div className="weatherImg">
                <img src={cardInfo.icon} alt="Weather Icon"/>
              </div>
          </div>
        </div>
    )
}