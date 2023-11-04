import * as weatherNow from "./weatherNow.js";
import * as weatherToday from "./weatherToday.js";

export const WEATHER_API_KEY = "e6eda6ffd30e45aebef74228232910 ";
export const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
export const switchButton = document.querySelector(".switchButton");
export const timeButtons = document.querySelector(".timeButtons");
export const nowButton = document.querySelector(".nowButton");
export const todayButton = document.querySelector(".todayButton");
export const weekButton = document.querySelector(".thisWeekButton");
export const content = document.querySelector(".content");
export const searchField = document.querySelector("#search");
export const magnifyingGlass = document.querySelector(".fa-magnifying-glass");
