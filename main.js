"use strict";

import getWeatherNow from "./weatherNow.js";
import * as config from "./config.js";

let tempForm = config.tempForm;

getWeatherNow(tempForm);

config.timeButtons.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  document
    .querySelectorAll(".timeButtons button")
    .forEach((button) => button.classList.remove("activeTimeButton"));

  btn.classList.add("activeTimeButton");
});

config.switchButton.addEventListener("click", function (e) {
  tempForm = tempForm == "celsius" ? "fahrenheit" : "celsius";
  config.switchButton.textContent =
    config.switchButton.textContent == "Switch to Fahrenheit"
      ? "Switch to Celsius"
      : "Switch to Fahrenheit";

  getWeatherNow(tempForm);
});
