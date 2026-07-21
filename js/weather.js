const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search');

const cityNameElement = document.querySelector('#city-name');
const temperatureElement = document.querySelector('#temperature');
const descriptionElement = document.querySelector('#weather-description');
const weatherIconElement = document.querySelector('#weather-icon');
const messageElement = document.querySelector('#weather-message');

//Converts an Open-Meteo weather code into text and a local icon.

function updateFixedWeatherCard(card, location, weather) {
    const weatherDetails = getWeatherDetails(
        weather.weather_code,
        weather.is_day === 1
    );

    const cityNameElement = card.querySelector('.city-name');
    const temperatureElement = card.querySelector('.temperature');
    const descriptionElement = card.querySelector(
        '.weather-description'
    );
    const iconElement = card.querySelector('.weather-icon');

    cityNameElement.textContent = location.name;
    temperatureElement.textContent =
        `${Math.round(weather.temperature_2m)}°C`;
    descriptionElement.textContent =
        weatherDetails.description;

    iconElement.src = weatherDetails.icon;
    iconElement.alt =
        `${weatherDetails.description} in ${location.name}`;
}

function getWeatherDetails(weatherCode, isDay) {
    
    if (weatherCode === 0) {         
        return {description: 'clear sky', icon: isDay ? './images/sun.png' : './images/moon.png'};     
    }      
    if ([1, 2, 3, 45, 48].includes(weatherCode)) {
        return {description: weatherCode >= 45 ? 'foggy' : 'cloudy', icon: './images/clouds-sun.png'};     
    }      
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode)) {
        return {description: 'rainy', icon: './images/rain.png'};     
    }      
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
        return {description: 'snowy', icon: './images/clouds-sun.png'};
    }
    return {description: 'unknown conditions', icon: './images/clouds-sun.png'}; 
}  

async function loadFixedWeatherCard(card) {
    const city = card.dataset.city;

    try {
        const location = await getCityCoordinates(city);

        const weather = await getCurrentWeather(
            location.latitude,
            location.longitude
        );

        updateFixedWeatherCard(card, location, weather);
    } catch (error) {
        console.error(
            `Could not load weather for ${city}:`,
            error
        );
    }
}

//Searches for a city and returns its coordinates.
async function getCityCoordinates(city) {
    
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    
    url.searchParams.set('name', city);
    url.searchParams.set('count', '1');
    url.searchParams.set('language', 'en');
    url.searchParams.set('format', 'json');
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Could not connect to the location service.');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        throw new Error('City not found.');
    }
    return data.results[0];
}

// Downloads current weather for the supplied coordinates.

async function getCurrentWeather(latitude, longitude) {
    
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    
    url.searchParams.set('latitude', latitude);
    url.searchParams.set('longitude', longitude);
    url.searchParams.set('current', 'temperature_2m,weather_code,is_day');
    url.searchParams.set('timezone', 'auto');
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Could not download weather data.');
    }
    
    const data = await response.json();
    
    if (!data.current) {
        throw new Error('Current weather data is unavailable.');
    }
    return data.current;
}

//Updates the first weather card.

function updateWeatherCard(location, weather) {
    
    const weatherDetails = getWeatherDetails(weather.weather_code, weather.is_day === 1);
    
    cityNameElement.textContent = location.name;
    temperatureElement.textContent = `${Math.round(weather.temperature_2m)}°C`;
    descriptionElement.textContent = weatherDetails.description;
    weatherIconElement.src = weatherDetails.icon;
    weatherIconElement.alt = `${weatherDetails.description} in ${location.name}`;
}

//Handles a search initiated by the user.

async function searchWeather() {
    
    const city = cityInput.value.trim();
    
    if (!city) {messageElement.textContent = 'Enter a city name.';
        return;
}

searchButton.disabled = true;
messageElement.textContent = 'Loading weather...';

try {
    const location = await getCityCoordinates(city);
    const weather = await getCurrentWeather(location.latitude, location.longitude);
    updateWeatherCard(location, weather);
    messageElement.textContent =`Weather updated for ${location.name}.`;
    cityInput.value = '';
}
catch (error) {
    
    messageElement.textContent = error.message;
    console.error(error);
}
    
    finally {
        searchButton.disabled = false;
    }
}

searchButton.addEventListener('click', searchWeather);

cityInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') {searchWeather();} });

const fixedWeatherCards = document.querySelectorAll('.fixed-weather-card');

fixedWeatherCards.forEach((card) => { loadFixedWeatherCard(card); } );