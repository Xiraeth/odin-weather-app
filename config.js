const WEATHER_API_KEY = "e6eda6ffd30e45aebef74228232910 ";
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
const switchButton = document.querySelector(".switchButton");
const timeButtons = document.querySelector(".timeButtons");
const content = document.querySelector(".content");
let tempForm = "celsius";

function switchActiveTimeButton(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  document
    .querySelectorAll(".timeButtons button")
    .forEach((button) => button.classList.remove("activeTimeButton"));

  btn.classList.add("activeTimeButton");
}

export {
  WEATHER_API_KEY,
  WEATHER_BASE_URL,
  switchButton,
  timeButtons,
  content,
  tempForm,
  switchActiveTimeButton,
};
