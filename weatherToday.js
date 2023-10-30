import * as config from "./config.js";
import getCoordinates from "./getCoords.js";

export default async function getWeatherForecastHourly() {
  config.content.innerHTML = "";
  const { lat, long } = await getCoordinates();
  const url = `${config.WEATHER_BASE_URL}/forecast.json?key=${config.WEATHER_API_KEY}&q=${lat},${long}&days=1`;
  const request = await fetch(url);
  const data = await request.json();

  const todaysForecast = data.forecast.forecastday[0].day;
  const hourlyForecast = data.forecast.forecastday[0];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  const year = now.getFullYear();
  const markup = `
  <div class="weatherTodayCard">
    <div class="todayHeader">
      <div class="dateAndLocation">
        <div class="city">${data.location.name}, ${data.location.region}a</div>
        <div class="date">${daysOfWeek[now.getDay()]}, ${day}/${
    month + 1
  }/${year}</div>
      </div>
      <div class="stats">
        <tempStats>
          <div class="maxTemp"><strong>Max:</strong> ${
            todaysForecast.maxtemp_c
          }&#176;C</div>
          <div class="minTemp"><strong>Min:</strong> ${
            todaysForecast.mintemp_c
          }&#176;C</div>
        </tempStats>
        <otherStats>
          <div class="totalPrecip">
            <strong>Total Precipitation:</strong> ${
              todaysForecast.totalprecip_mm
            }mm
          </div>
          <div class="avgHumidity">
            <strong>Average Humidity:</strong>${todaysForecast.avghumidity}%
          </div>
        </otherStats>
      </div>
      <div class="statusAndIcon">${todaysForecast.condition.text} <img src="${
    todaysForecast.condition.icon
  }" alt="Weather Icon"></div>
      </div>
    </div>
  `;

  config.content.insertAdjacentHTML("afterbegin", markup);
  const todayCard = document.querySelector(".weatherTodayCard");
  createHourlyForecast(hourlyForecast.hour, todayCard);
}

function createHourlyForecast(hourlyForecastArray, content) {
  let markup = "";
  const hourSegments = document.createElement("div");
  hourSegments.classList.add("hourSegments");
  content.appendChild(hourSegments);
  for (let i = 0; i < 8; i++) {
    const forecastObj = hourlyForecastArray[3 * i];
    if (i < 7) {
      markup += `
      <div class="segment-${i + 1}">
        <div class="hour">${forecastObj.time.slice(-5)} <img src="${
        forecastObj.condition.icon
      }"></img></div>
        <div class="temp">Temp: <span>${forecastObj.temp_c}&#176;C</span></div>
        <div class="humid">Humidity: <span>${forecastObj.humidity}%</span></div>
        <div class="precip">Precip.: <span>${
          forecastObj.precip_mm
        }mm</span></div>
        <div class="pressure">Pressure: <span>${
          forecastObj.pressure_mb
        }mb</span></div>
        <div class="wind_str">Wind: <span>${
          forecastObj.wind_kph
        } km/h</span></div>
        <div class="wind_dir">Wind Dir.: <span>${
          forecastObj.wind_dir
        }</span></div>
      </div>
      <div class="border"></div>
      `;
    } else {
      markup += `
      <div class="segment-${i + 1}">
        <div class="hour">${forecastObj.time.slice(-5)} <img src="${
        forecastObj.condition.icon
      }"></div>
        <div class="temp">Temp: <span>${forecastObj.temp_c}&#176;C</span></div>
        <div class="humid">Humidity: <span>${forecastObj.humidity}%</span></div>
        <div class="precip">Precip.: <span>${
          forecastObj.precip_mm
        }mm</span></div>
        <div class="pressure">Pressure: <span>${
          forecastObj.pressure_mb
        }mb</span></div>
        <div class="wind_str">Wind: <span>${
          forecastObj.wind_kph
        } km/h</span></div>
        <div class="wind_dir">Wind Dir.: <span>${
          forecastObj.wind_dir
        }</span></div>
      </div>
      `;
    }
  }
  hourSegments.insertAdjacentHTML("beforeend", markup);
}
