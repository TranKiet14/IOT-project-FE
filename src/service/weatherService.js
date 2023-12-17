const API_DOMAIN = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "49a7c753794448e6e10fd496ce53ffe1";

export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result
}

export const getWeatherCurrent = async (city) => {
    const result = await get(`weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`)
    return result
}

export const getWeatherForecast = async (city) => {
    const result = await get(`forecast?q=${city}&appid=${API_KEY}&units=metric&lang=vi`)
    return result
}