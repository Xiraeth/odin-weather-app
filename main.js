"use strict";

import getWeatherNow from "./weatherNow.js";
import getWeatherForecastHourly from "./weatherToday.js";
import getWeatherWeeklyForecast from "./weatherWeek.js";
import * as config from "./config.js";

let tempForm = "celsius";
let location = "here";
let activeTab = document
  .querySelector(".activeTimeButton")
  .textContent.toLowerCase();

window.addEventListener("load", getWeatherNowHandler);
config.timeButtons.addEventListener("click", switchActiveTimeButton);
config.switchButton.addEventListener("click", switchButtonHandler);
config.nowButton.addEventListener("click", getWeatherNowHandler);
config.todayButton.addEventListener("click", getWeatherTodayHandler);
config.weekButton.addEventListener("click", getWeatherWeeklyHandler);
config.magnifyingGlass.addEventListener("click", getLocationWeatherHandler);

function switchActiveTimeButton(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  activeTab = btn.textContent.toLowerCase();

  document
    .querySelectorAll(".timeButtons button")
    .forEach((button) => button.classList.remove("activeTimeButton"));

  btn.classList.add("activeTimeButton");
}

function switchButtonHandler(e) {
  tempForm = tempForm == "celsius" ? "fahrenheit" : "celsius";
  config.switchButton.textContent =
    config.switchButton.textContent == "Switch to Fahrenheit"
      ? "Switch to Celsius"
      : "Switch to Fahrenheit";

  if (activeTab == "now") getWeatherNow(tempForm);
  else if (activeTab == "today") getWeatherForecastHourly(tempForm);
  else getWeatherWeeklyForecast(tempForm);
}

function getWeatherNowHandler() {
  getWeatherNow(tempForm, location);
}

function getWeatherTodayHandler() {
  getWeatherForecastHourly(tempForm, location);
}

function getWeatherWeeklyHandler() {
  getWeatherWeeklyForecast(tempForm, location);
}

function getLocationWeatherHandler(e) {
  const loc = config.searchField.value;
  if (activeTab == "now") getWeatherNow(tempForm, loc);
  else if ((activeTab = "today")) getWeatherForecastHourly(tempForm, loc);
  else getWeatherWeeklyForecast(tempForm, loc);
}

config.searchField.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    getLocationWeatherHandler();
    location = config.searchField.value;
  }
});
