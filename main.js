"use strict";

import getWeatherNow from "./weatherNow.js";
import getWeatherForecastHourly from "./weatherToday.js";
import * as config from "./config.js";

let tempForm = "celsius";
let activeTab = document
  .querySelector(".activeTimeButton")
  .textContent.toLowerCase();

window.addEventListener("load", getWeatherNowHandler);
config.timeButtons.addEventListener("click", switchActiveTimeButton);
config.switchButton.addEventListener("click", switchButtonHandler);
config.nowButton.addEventListener("click", getWeatherNowHandler);
config.todayButton.addEventListener("click", getWeatherTodayHandler);

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
}

function getWeatherNowHandler() {
  getWeatherNow(tempForm);
}

function getWeatherTodayHandler() {
  getWeatherForecastHourly(tempForm);
}
