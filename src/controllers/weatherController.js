import dotenv from 'dotenv'; // dotenv to use the .env file with the weatherAPI key
dotenv.config();
const API_KEY = process.env.W_API_KEY; // store API key from .env

export const weather = (req, res) => { // render weather page
    res.render('weather', { // weather.ejs
        title: 'Weather Page',
        csrfToken: req.csrfToken()
    });
    return;
};

// get weather info from WeatherAPI 
export const getWeather = async (req, res) => {
  const { city } = req.params;

  try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=yes`);
      const data = await response.json(); // store response in json format

      if (data.error) {
          return res.status(400).json({ error: data.error.message }); // empty json or errors
      }

      const hourlyTemperature = data.forecast.forecastday[0].hour.map(item => ({ // traverse forecastday(current day).hour array
          hour: item.time.split(' ')[1], // split the string from time item and get the second element that is the hour in this case
          temp_c: item.temp_c // hourly temperature
      }));

      const alert = data.alerts.alert.length > 0 ? data.alerts.alert[0].headline : null; // verify if alert field is empty

      res.json({ // json response with the data
          current: data.current,
          hourlyTemperature,
          alert
      });

  } catch (error) {
      console.error('API error:', error); // fetch error
      res.status(500).json({ error: "Can't find weather data" });
  }
};