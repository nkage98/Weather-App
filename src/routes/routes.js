import express from 'express';
import { getWeather, weather } from '../controllers/weatherController.js';
import { listUsers, addUser, userInfo, infoPage, deleteUser} from '../controllers/userController.js';
import { home } from '../controllers/homeController.js';
const router = express.Router();

router.get('/', home); // initial page
router.get('/weather', weather);//weather page
router.get('/users/details/:id', infoPage);//user detailed info page

//post and get endpoints
router.get('/weather/:city', getWeather);

router.get('/users', listUsers);
router.post('/users', addUser);
router.get('/users/:id', userInfo);
router.delete('/users/:id', deleteUser);

export default router;