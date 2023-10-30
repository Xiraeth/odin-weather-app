"use strict";

import { switchButtonHandler, pageLoadWeatherHandler } from "./weatherNow.js";
import * as config from "./config.js";

let tempForm = config.tempForm;

window.addEventListener("load", pageLoadWeatherHandler);
config.timeButtons.addEventListener("click", config.switchActiveTimeButton);
config.switchButton.addEventListener("click", switchButtonHandler);
config.nowButton.addEventListener("click", pageLoadWeatherHandler);
