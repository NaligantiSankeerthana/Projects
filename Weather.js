document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const locateButton = document.getElementById('locateButton');
    const currentWeather = document.getElementById('currentWeather');
    const forecast = document.getElementById('forecast');

    const fetchWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    };

    const fetchForecast = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    };

    const displayWeather = (data) => {
        currentWeather.innerHTML = `
            <div class="current">
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            </div>
        `;
    };

    const displayForecast = (data) => {
        let forecastHtml = '<h2>5-Day Forecast</h2><div class="forecast">';
        data.list.forEach((item, index) => {
            if (index % 8 === 0) { // Display one forecast per day
                forecastHtml += `
                    <div class="forecast-day">
                        <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                        <p>Temp: ${item.main.temp}°C</p>
                        <p>${item.weather[0].description}</p>
                    </div>
                `;
            }
        });
        forecastHtml += '</div>';
        forecast.innerHTML = forecastHtml;
    };

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city) {
            const weatherData = await fetchWeather(city);
            const forecastData = await fetchForecast(city);
            displayWeather(weatherData);
            displayForecast(forecastData);
        }
    });

    locateButton.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            const weatherData = await response.json();
            const forecastData = await fetchForecast(weatherData.name);
            displayWeather(weatherData);
            displayForecast(forecastData);
        });
    });
});
