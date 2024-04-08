
const API_KEY = '75c5fe145cd9991359551844b588e1b4';

const getWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

const setBackgroundBasedOnWeather = (weatherCondition) => {
    const body = document.body;
    let backgroundImage;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            backgroundImage = 'url("https://media.istockphoto.com/id/1006507940/photo/looking-up-view-of-panoramic-modern-city-skyline-with-blue-sky-and-green-tree-in-shinjuku.jpg")';
            break;
        case 'clouds':
            backgroundImage = 'url("cloudy.jpg")';
            break;
        case 'rain':
            backgroundImage = 'url("https://st2.depositphotos.com/5647624/43701/i/450/depositphotos_437017794-stock-photo-moscow-night-rain-drops-glass.jpg")';
            break;
        default:
            backgroundImage = 'url("default.jpg")';
    }

    body.style.backgroundImage = backgroundImage;
};

const displayWeatherInfo = (weatherData) => {
    const weatherInfoContainer = document.getElementById('weatherInfo');
    weatherInfoContainer.innerHTML = '';

    if (!weatherData) {
        weatherInfoContainer.textContent = 'Error fetching weather data. Please try again.';
        return;
    }

    const { main, weather, name } = weatherData;
    const weatherCondition = weather[0].main;
    const temperatureKelvin = main.temp;
    const temperatureFahrenheit = ((temperatureKelvin - 273.15) * 9/5) + 32;
    const humidity = main.humidity;

    const weatherInfoHTML = `
        <h2>${name}</h2>
        <p>Condition: ${weatherCondition}</p>
        <p>Temperature: ${temperatureFahrenheit.toFixed(2)} °F</p>
        <p>Humidity: ${humidity}%</p>
    `;

    weatherInfoContainer.innerHTML = weatherInfoHTML;
};

const getAndDisplayWeather = async () => {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    const weatherData = await getWeatherData(city);
    displayWeatherInfo(weatherData);
};

// Event listener for the "Get Weather" button
const getWeatherButton = document.getElementById('getWeatherButton');
getWeatherButton.addEventListener('click', getAndDisplayWeather);