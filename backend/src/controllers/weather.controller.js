import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();


const weatherController = async (req, res) => {
    const {city} = req.params;
    const defaultCity = 'sao paulo';
    const apiKey = process.env.WEATHER_API_KEY;

    if(req.userId) {
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
        
        console.log('Fetching weather data from:', currentWeatherURL, forecastWeatherURL);
        
        const weatherData = await fetch(currentWeatherURL)
            .then(res => res.json())
            .catch(err => console.error('Error fetching current weather:', err));
        
        const forecastData = await fetch(forecastWeatherURL)
            .then(res => res.json())
            .catch(err => console.error('Error fetching forecast data:', err));
        
        const data = { current: weatherData, forecast: forecastData.list };

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error in weather services:', error);
        res.status(500).send('Internal Server Error');
    };
};

const favoriteCityController = async (req, res) => {
    const {city} = req.body;
    const id = req.userId;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $addToSet: { 
                favoriteCities: city
            }},
            { runValidators: true }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({message: 'Favorite city added'}, user);
    }
    catch (err){
        return res.status(500).json({message: 'Internal server error'}, err);
    }
}

const getFavoriteCitiesController = async (req, res) => {
    const id = req.userId;

    try {
        const cities = await User.findById(id).select("favoriteCities -_id");

        return res.status(200).json(cities);
    }
    catch(err){
        return res.status(500).json({message: "internal server error."}, err);
    }
}

const deleteFavoriteCityController = async (req, res) => {
    const id =  req.userId;
    const {city} = req.body;

    try {
        const user = await User.findById(id);

        user.favoriteCities = user.favoriteCities.filter(c => c !== city);
        
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        await user.save();

        return res.status(200).json(user.favoriteCities);
    }
    catch (err){
        return res.status(500).json({message: 'Internal server error'}, err);
    }
}



export {weatherController, favoriteCityController, getFavoriteCitiesController, deleteFavoriteCityController};