import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import sunnyImage from './assets/sunny.png';
import cloudyImage from './assets/cloudy.png';
import rainyImage from './assets/rainy.png';
import thunderstormImage from './assets/thunder.png';
import defaultImage from './assets/default.png'; 

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter the place');
  const [weatherImage, setWeatherImage] = useState('');

  useEffect(() => {
    let index = 0;
    const message = 'Enter the place';
    const interval = setInterval(() => {
      setPlaceholder(message.substring(0, index) || 'Enter the place');
      index = (index + 1) % (message.length + 1);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    console.log(city);
    const API_KEY = '4c6f432811d059736e6cafde29d9ef0a'; 
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      if (weatherCondition.includes('clear')) {
        setWeatherImage(sunnyImage);
      } else if (weatherCondition.includes('clouds')) {
        setWeatherImage(cloudyImage);
      } else if (weatherCondition.includes('rain')) {
        setWeatherImage(rainyImage);
      } else if (weatherCondition.includes('thunderstorm')) {
        setWeatherImage(thunderstormImage);
      } else {
        setWeatherImage(defaultImage);
      }
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1 className='head'>Weather <span className='subHead'>App</span></h1>
      <input
        type="text"
        placeholder={placeholder}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {weather && (
        <div className="card">
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
          <div className="weather-image">
            <img src={weatherImage} alt={weather.weather[0].main}  />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
