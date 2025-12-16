import express from "express";
import { weatherController } from "../controllers/weather.controller.js";
import {
    loginController,
    registerController,
    updateUserController,
    getUserController,
    deleteUserController,
    addFavCityController,
    delFavCityController,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const routes = express.Router();

// public routes
routes.post("/register", registerController);

routes.post("/login", loginController);

routes.get("/weather/city/:city", weatherController);

//routes.get("/auth/refresh", authCheckController);

// private routes
routes.get("/user/", auth, getUserController);

routes.put("/user/", auth, updateUserController);

routes.delete("/user/", auth, deleteUserController);

routes.post("/weather/favorite", auth, addFavCityController);

routes.delete("/weather/favorite", auth, delFavCityController);

export default routes;
