import dotenv from 'dotenv';

dotenv.config();

async function getWeather(city) {
    const apiKey = process.env.WEATHER_API_KEY;

    const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    console.log('Fetching weather data from:', currentWeatherURL, forecastWeatherURL);
    const weatherData = await fetch(currentWeatherURL)
                                    .then(res => res.json())
                                    .catch(err => console.error('Error fetching current weather:', err));
    
    const forecastData = await fetch(forecastWeatherURL)
                                    .then(res => res.json())
                                    .catch(err => console.error('Error fetching forecast data:', err));
    
    const data = { current: weatherData, forecast: forecastData.list };

    return data;
}

export default getWeather;