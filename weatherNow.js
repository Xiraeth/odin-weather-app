import * as config from "./config.js";
import getCoordinates from "./getCoords.js";

export default async function getWeatherNow(tempForm) {
  const formatter = new Intl.NumberFormat("en-us", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const { lat, long } = await getCoordinates();
  const url = `${config.WEATHER_BASE_URL}/current.json?key=${config.WEATHER_API_KEY}&q=${lat},${long}`;
  const request = await fetch(url);
  const response = await request.json();

  const city = response.location.name;
  const status = response.current.condition.text;
  const temperature =
    tempForm == "celsius" ? response.current.temp_c : response.current.temp_f;
  const now = new Date();
  const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  const time = `${formatter.format(now.getHours())}:${formatter.format(
    now.getMinutes()
  )}`;
  const humid = response.current.humidity;
  const precip = response.current.precip_mm;
  const pressure = response.current.pressure_mb;
  const wind = response.current.wind_kph;
  const windDir = response.current.wind_dir;
  const icon = response.current.condition.icon;
  console.log(response);
  loadWeatherNowHTML(
    city,
    status,
    temperature,
    date,
    time,
    humid,
    precip,
    pressure,
    wind,
    windDir,
    icon,
    tempForm
  );
}

function loadWeatherNowHTML(
  city,
  status,
  temperature,
  date,
  time,
  humid,
  precip,
  pressure,
  wind,
  windDir,
  icon,
  tempForm
) {
  const markup = `
    <div class="card">
      <header class="city">${city}<img src="${icon}"></header>
      <div class="date">${date} <span>${time}</span></div>
      <p class="status">Status: <span>${status}</span></p>
      <p class="temp">Temperature: <span>${temperature}&deg;${
    tempForm == "celsius" ? "C" : "F"
  }</span></p>
      <p class="humid">Humidity: <span>${humid}&#37;</span></p>
      <p class="precip">Precipitation: <span>${precip}mm</span></p>
      <p class="pressure">Pressure: <span>${pressure}mb</span></p>
      <p class="wind">
        Wind:
        <span>${wind} <span id="wind">km/h</span></span>
      </p>
      <p class="windDir">Wind direction: <span>${windDir}</span></p>
    </div>
  `;
  config.content.innerHTML = "";
  config.content.insertAdjacentHTML("beforeend", markup);
}
