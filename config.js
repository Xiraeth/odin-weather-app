const WEATHER_API_KEY = "e6eda6ffd30e45aebef74228232910 ";
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
const content = document.querySelector(".content");
const timeButtons = document.querySelector(".timeButtons");
const switchButton = document.querySelector(".switchButton");
let tempForm = "celsius";

export {
  WEATHER_API_KEY,
  WEATHER_BASE_URL,
  content,
  timeButtons,
  switchButton,
  tempForm,
};
