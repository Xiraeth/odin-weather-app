import * as config from "./config.js";
import getCoordinates from "./getCoords.js";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function getWeatherWeeklyForecast(tempForm) {
  config.content.innerHTML = "";

  const formatter = new Intl.NumberFormat("gr-GR", {
    useGrouping: false,
    minimumIntegerDigits: 2,
  });
  const { lat, long } = await getCoordinates();
  const url = `${config.WEATHER_BASE_URL}/forecast.json?key=${config.WEATHER_API_KEY}&q=${lat},${long}&days=7`;
  const request = await fetch(url);
  const data = await request.json();

  // Defining maximum weekly temperature for Celsius and Fahrenheit
  const maxTempWeek_c = getMaxTempWeekly_c(data);
  const maxTempWeek_f = getMaxTempWeekly_f(data);

  // Same for min temperature
  const minTempWeek_c = getMinTempWeekly_c(data);
  const minTempWeek_f = getMinTempWeekly_f(data);

  const totalPrecip = getTotalPrecip(data);

  const avgHumidity = getAvgHumidity(data);

  const now = new Date();
  const month = formatter.format(now.getMonth() + 1);
  const day = formatter.format(now.getDate());
  const year = formatter.format(now.getFullYear());

  const markup = `
  <div class="weatherWeeklyCard">
    <div class="todayHeader">
      <div class="dateAndLocation">
        <div class="city">${data.location.name}, ${data.location.region}</div>
        <div class="date">${
          daysOfWeek[now.getDay()]
        }, ${day}/${month}/${year}</div>
      </div>
      <div class="stats">
        <tempStats>
          <div class="maxTemp"><strong>Max:</strong> ${
            tempForm == "celsius" ? maxTempWeek_c : maxTempWeek_f
          }&#176;${tempForm == "celsius" ? "C" : "F"}</div>
          <div class="minTemp"><strong>Min:</strong> ${
            tempForm == "celsius" ? minTempWeek_c : minTempWeek_f
          }&#176;${tempForm == "celsius" ? "C" : "F"}</div>
        </tempStats>
        <otherStats>
          <div class="totalPrecip">
            <strong>Total Precipitation:</strong> ${totalPrecip}mm
          </div>
          <div class="avgHumidity">
            <strong>Average Humidity:</strong>${avgHumidity}%
          </div>
        </otherStats>
      </div>
      <div class="timeLive"></div>
      </div>
    </div>
  `;
  // Insert the HTML into the DOM to create the forecast
  config.content.insertAdjacentHTML("afterbegin", markup);
  const weekCard = document.querySelector(".weatherWeeklyCard");

  createWeeklyForecast(data.forecast.forecastday, weekCard, tempForm);

  // Display a clock on the top right of the weekly forecast tab
  const clock = document.querySelector(".timeLive");
  clock.textContent = getTimeNow(formatter);
  setInterval(function () {
    clock.textContent = getTimeNow(formatter);
  }, 1000);
}

// Create the HTML for the weekly forecast
function createWeeklyForecast(data, content, tempForm) {
  let markup = "";

  const daySegments = document.createElement("div");
  daySegments.classList.add("daySegments");
  content.appendChild(daySegments);

  const now = new Date();
  const dayNum = now.getDate();
  const month = now.getMonth();
  console.log(data);
  data.forEach((day, i) => {
    console.log(day);
    const { dayNum, dateFormat } = getDay(day);
    if (i < 6) {
      markup += `
        <div class="segment-${i + 1}">
          <div class="day">${dayNum} <span>${dateFormat}</span></div>
          <div class="temp">Max temp: <span>${
            tempForm == "celsius" ? day.day.maxtemp_c : day.day.maxtemp_f
          }°${tempForm == "celsius" ? "C" : "F"}</span></div>
          <div class="humid">Min temp: <span>${
            tempForm == "celsius" ? day.day.mintemp_c : day.day.mintemp_f
          }°${tempForm == "celsius" ? "C" : "F"}</span></div>
          <div class="precip">Avg Humid: <span>${
            day.day.avghumidity
          }%</span></div>
          <div class="precip">Precip.: <span>${
            day.day.totalprecip_mm
          }mm</span></div>
        </div>
        <div class="border"></div>
    `;
    } else {
      markup += `
        <div class="segment-${i + 1}">
          <div class="day">${dayNum} <span>${dateFormat}</span></div>
          <div class="temp">Max temp: <span>${
            tempForm == "celsius" ? day.day.maxtemp_c : day.day.maxtemp_f
          }°${tempForm == "celsius" ? "C" : "F"}</span></div>
          <div class="humid">Min temp: <span>${
            tempForm == "celsius" ? day.day.mintemp_c : day.day.mintemp_f
          }°${tempForm == "celsius" ? "C" : "F"}</span></div>
          <div class="precip">Avg Humid: <span>${
            day.day.avghumidity
          }%</span></div>
          <div class="precip">Precip.: <span>${
            day.day.totalprecip_mm
          }mm</span></div>
        </div>
      </div>
        `;
    }
  });
  daySegments.insertAdjacentHTML("beforeend", markup);
}

// Retrieve day info (what day it is for that specific dd-mm-yyyy day)
function getDay(dayObj) {
  const dateArr = dayObj.date.split("-");
  const day = parseInt(dateArr[2], 10);
  const month = parseInt(dateArr[1] - 1, 10);
  const year = parseInt(dateArr[0], 10);
  const newDate = new Date(year, month, day);
  const dayNum = daysOfWeek[newDate.getDay()];
  const dateFormat = `${newDate.getDate()}/${newDate.getMonth() + 1}`;
  return { dayNum, dateFormat };
}

// Function for total weekly precipitation
function getTotalPrecip(data) {
  const todaysPrecip = data.forecast.forecastday[0].day.totalprecip_mm;
  return data.forecast.forecastday.reduce((acc, cur) => {
    return acc + cur.day.totalprecip_mm;
  }, todaysPrecip);
}

//Functions for maximum and minimum weekly temperatures
function getMaxTempWeekly_c(data) {
  return data.forecast.forecastday.toSorted(
    (prev, curr) => curr.day.maxtemp_c - prev.day.maxtemp_c
  )[0].day.maxtemp_c;
}

function getMaxTempWeekly_f(data) {
  return data.forecast.forecastday.toSorted(
    (prev, curr) => curr.day.maxtemp_f - prev.day.maxtemp_f
  )[0].day.maxtemp_f;
}

function getMinTempWeekly_c(data) {
  return data.forecast.forecastday.toSorted(
    (prev, curr) => prev.day.maxtemp_c - curr.day.maxtemp_c
  )[0].day.mintemp_c;
}

function getMinTempWeekly_f(data) {
  return data.forecast.forecastday.toSorted(
    (prev, curr) => prev.day.maxtemp_f - curr.day.maxtemp_f
  )[0].day.mintemp_f;
}

// Average weekly humidity
function getAvgHumidity(data) {
  let total = 0;
  data.forecast.forecastday.forEach((day) => {
    total += day.day.avghumidity;
  });
  return (total / data.forecast.forecastday.length).toFixed(1);
}

// Function to keep the clock running in 'weekly weather'
function getTimeNow(formatter) {
  const now = new Date();
  const hours = formatter.format(now.getHours());
  const minutes = formatter.format(now.getMinutes());
  const seconds = formatter.format(now.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}
