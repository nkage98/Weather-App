import express from 'express';
import getWeatherByCity from "../controllers/weather.controller.js";

const routes = express.Router();

// public routes
routes.get('/weather/', getWeatherByCity);
routes.get('/weather/:city', getWeatherByCity);

// routes.post('/register', (req, res) => {
//     res.send('User registered');
// })
// routes.post('/login', (req, res) => {
//     res.send('User logged in');
// })
// routes.post('/register', (req, res) => {
//     res.send('User registered');
// })

// // private routes
// routes.get('/profile/:id', (req, res) => {
//     res.send('User profile');
// })
// routes.put('/profile/:id', (req, res) => {
//     res.send('User profile updated');
// })

// routes.get('/weather/favorites', (req, res) => {
//     res.send('User favorite cities weather');
// })




export default routes;