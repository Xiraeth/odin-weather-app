export const WEATHER_API_KEY = "e6eda6ffd30e45aebef74228232910 ";
export const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
export const switchButton = document.querySelector(".switchButton");
export const timeButtons = document.querySelector(".timeButtons");
export const nowButton = document.querySelector(".nowButton");
export const content = document.querySelector(".content");

export let tempForm = "celsius";

export function switchActiveTimeButton(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  document
    .querySelectorAll(".timeButtons button")
    .forEach((button) => button.classList.remove("activeTimeButton"));

  btn.classList.add("activeTimeButton");
}
