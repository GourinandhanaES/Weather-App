import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter the place');

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
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default App
