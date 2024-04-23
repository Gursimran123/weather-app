import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [data,setData] = useState({});
  const [location,setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const searchLocation = (e) =>{
    if(e.key==='Enter'){
       setLoading(true);
      axios
        .get(weatherAPI)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setLoading(false); 
        });
      setLocation('')
    }
  }

  return (
    <>
      <div className="app">
        <div className="search">
          <input
            type="text"
            value={location}
            onKeyUp={searchLocation}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location..."
          />
        </div>
        <div className="container">
          {loading ? (
            <div className='loading'>Loading...</div>
          ) : (
            <>
              <div className="top">
                <div className="location">
                  <p>{data.name}</p>
                </div>
                <div className="temp">
                  {data.main ? (
                    <h1>{data.main.temp.toFixed()}&#176;F</h1>
                  ) : null}
                </div>
                <div className="description">
                  {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
              </div>
              {data.name !== undefined && (
                <div className="bottom">
                  <div className="feels">
                    {data.main ? (
                      <p className="bold">
                        {data.main.feels_like.toFixed()}&#176; F
                      </p>
                    ) : null}
                    <p>Feels Like</p>
                  </div>
                  <div className="humidity">
                    {data.main ? (
                      <p className="bold">{data.main.humidity}%</p>
                    ) : null}
                    <p>Humidity</p>
                  </div>
                  <div className="wind">
                    {data.wind ? (
                      <p className="bold">{data.wind.speed} MPH</p>
                    ) : null}
                    <p>Wind Speed</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App
