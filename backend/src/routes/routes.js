import express from 'express';
import {weatherController, favoriteCityController, getFavoriteCitiesController, deleteFavoriteCityController} from "../controllers/weather.controller.js";
import { loginController, registerController, updateUserController, getUserController, deleteUserController } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const routes = express.Router();

// public routes
routes.post('/register', registerController);

routes.post('/login', loginController);

routes.get('/weather/city/:city', weatherController);

// private routes
routes.get('/user/', auth, getUserController);

routes.put('/user/', auth, updateUserController);

routes.delete('/user/', auth, deleteUserController);

routes.post('/weather/favorite', auth, favoriteCityController);

routes.get('/weather/favorite', auth, getFavoriteCitiesController);

routes.delete('/weather/favorite', auth, deleteFavoriteCityController);



export default routes;