
const API_KEY = '373142279df8457fbc6164843250104';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const forecastElement = document.getElementById('forecast');


searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeather(location);
    }
});


async function getWeather(location) {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${location}&days=5`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}


function displayWeather(data) {
    const current = data.current;
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    temperatureElement.textContent = `Temperature: ${current.temp_c.toFixed(1)}°C`;
    descriptionElement.textContent = current.condition.text;
    humidityElement.textContent = `Humidity: ${current.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${current.wind_kph.toFixed(1)} km/h`;
}


function displayForecast(data) {
    forecastElement.innerHTML = '';
    data.forecast.forecastday.forEach((day, index) => {
        if (index === 0) return;
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = day.day.avgtemp_c.toFixed(1);
        const description = day.day.condition.text;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h3>${dayName}</h3>
            <p>${temp}°C</p>
            <p>${description}</p>
        `;
        forecastElement.appendChild(forecastItem);
    });
}

getWeather('India');
