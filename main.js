"use strict";

import {
  getWeatherNow,
  switchButtonHandler,
  pageLoadWeather,
} from "./weatherNow.js";
import * as config from "./config.js";

let tempForm = config.tempForm;

window.addEventListener("load", pageLoadWeather);
config.timeButtons.addEventListener("click", config.switchActiveTimeButton);
config.switchButton.addEventListener("click", switchButtonHandler);
