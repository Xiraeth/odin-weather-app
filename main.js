"use strict";

import { switchButtonHandler, pageLoadWeatherHandler } from "./weatherNow.js";
import getWeatherForecastHourly from "./weatherToday.js";
import * as config from "./config.js";

window.addEventListener("load", pageLoadWeatherHandler);
config.timeButtons.addEventListener("click", config.switchActiveTimeButton);
config.switchButton.addEventListener("click", switchButtonHandler);
config.nowButton.addEventListener("click", pageLoadWeatherHandler);
config.todayButton.addEventListener("click", getWeatherForecastHourly);
