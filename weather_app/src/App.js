import './App.css';
import './components/Search/Search'
import Search from './components/Search/Search';
import Current_Weather from './components/Current_Weather/Current_Weather';
import Forecast from './components/Forecast/Forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App() {
  const [current_Weather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    //console.log(searchData);
    const [la, lo] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${la}&lon=${lo}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${la}&lon=${lo}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(console.error)
      })
  }

  console.log(current_Weather);
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {current_Weather && <Current_Weather data={current_Weather}></Current_Weather>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
