import { Routes } from "express"

const routes = Routes();

// public routes
routes.get('/weather', (req, res) => { // initial route
    res.send('weather data');
})
routes.post('/register', (req, res) => {
    res.send('User registered');
})
routes.post('/login', (req, res) => {
    res.send('User logged in');
})
routes.post('/register', (req, res) => {
    res.send('User registered');
})

// private routes
routes.get('/profile/:id', (req, res) => {
    res.send('User profile');
})
routes.put('/profile/:id', (req, res) => {
    res.send('User profile updated');
})




export default routes;