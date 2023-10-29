"use strict";

const WEATHER_API_KEY = "e6eda6ffd30e45aebef74228232910 ";
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
const content = document.querySelector(".content");
const timeButtons = document.querySelector(".timeButtons");

getWeatherNow();

async function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const long = pos.coords.longitude;
        const lat = pos.coords.latitude;
        resolve({ long, lat });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

async function getWeatherNow() {
  const formatter = new Intl.NumberFormat("en-us", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const { lat, long } = await getCoordinates();
  const url = `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${long}`;
  const request = await fetch(url);
  const response = await request.json();

  const city = response.location.name;
  const status = response.current.condition.text;
  const temperature = response.current.temp_c;
  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  const time = `${formatter.format(now.getHours())}:${formatter.format(
    now.getMinutes()
  )}`;
  const humid = response.current.humidity;
  const wind = response.current.wind_kph;
  const windDir = response.current.wind_dir;
  const icon = response.current.condition.icon;
  console.log(response);
  loadPageHTML(
    city,
    status,
    temperature,
    date,
    time,
    humid,
    wind,
    windDir,
    icon
  );
}

function loadPageHTML(
  city,
  status,
  temperature,
  date,
  time,
  humid,
  wind,
  windDir,
  icon
) {
  const markup = `
    <div class="card">
      <header class="city">${city}<img src="${icon}"></header>
      <div class="date">${date} <span>${time}</span></div>
      <p class="status">Status: <span>${status}</span></p>
      <p class="temp">Temperature: <span>${temperature}&deg;C</span></p>
      <p class="humid">Humidity: <span>${humid}&#37;</span></p>
      <p class="wind">
        Wind:
        <span>${wind} <span id="wind">km/h</span></span>
      </p>
      <p class="windDir">Wind direction: <span>${windDir}</span></p>
    </div>
  `;

  content.insertAdjacentHTML("beforeend", markup);
}

timeButtons.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  document
    .querySelectorAll(".timeButtons button")
    .forEach((button) => button.classList.remove("activeTimeButton"));

  btn.classList.add("activeTimeButton");
});
