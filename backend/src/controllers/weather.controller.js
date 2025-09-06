import getWeather from '../services/weather.service.js';


export const getWeatherByCity = async (req, res) => {
    const {city} = req.params;
    const defaultCity = 'sao paulo';
    try {
        if (!city) {
            const data = await getWeather(defaultCity);
            res.status(200).json(data);
        }
        const data = await getWeather(city);
        res.status(200).json(data);

    } catch (error) {
        console.error('Error in weather services:', error);
        res.status(500).send('Internal Server Error');
    };
};


export default getWeatherByCity;