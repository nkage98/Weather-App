export async function fetchWeather(city) {
    const { city } = req.params;
    const defaultCity = "sao paulo";
    const apiKey = process.env.WEATHER_API_KEY;

    if (req.userId) {
        const id = req.userId;
        const user = await User.findOne({ id });
        defaultCity = user.favoriteCities[0] || defaultCity;
    }

    try {
        if (!city) {
            city = defaultCity;
        }

        const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        console.log(
            "Fetching weather data from:",
            currentWeatherURL,
            forecastWeatherURL
        );

        const weatherData = await fetch(currentWeatherURL)
            .then((res) => res.json())
            .catch((err) =>
                console.error("Error fetching current weather:", err)
            );

        const forecastData = await fetch(forecastWeatherURL)
            .then((res) => res.json())
            .catch((err) =>
                console.error("Error fetching forecast data:", err)
            );

        const data = { current: weatherData, forecast: forecastData.list };

        if (data.current.cod !== 200) {
            const error = new Error(data.current.message);
            console.error("Error in weather services:", error);
            return res
                .status(Number(data.current.cod))
                .json({ message: data.current.message });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in weather services:", error);
        res.status(500).send("Internal Server Error");
    }
}
