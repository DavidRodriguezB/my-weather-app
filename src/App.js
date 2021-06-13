import './App.css';
import React, {useEffect, useState } from "react";
import Week from './components/Week';
import Day from './components/Day';
import { Dimmer, Loader } from 'semantic-ui-react';
import Select from 'react-select'

export default function App() {

  const [data, setData] = useState([]);
  const [day, setDay] = useState([]);
  const [cities, setCities] = useState([]);
  const [optionsLoaded, setOptionsLoaded] = useState([]);
  const [options, setOptions] = useState([]);
  const [currCity, setCurrCity] = useState([]);

  const search = async (value) => {
    if (typeof cities[value.label] != 'undefined') {
      var values = cities[value.label].split(',')
      setCurrCity(value.label)
      fetchWeek(values[0], values[1]);
    }
  }

  useEffect(() => {
    const fetchCities = async () => {
      await fetch(`${process.env.REACT_APP_LOCAL_API_URL}get/city/all`)
      .then(res => res.json())
      .then(result => {
        setCities(result);
        var optionsData = [];
        var selectOptions = [];
        for (let i = 0; i < Object.keys(result).length; i++) {
          optionsData[result[Object.keys(result)[i]].name] = result[Object.keys(result)[i]].latitude+','+result[Object.keys(result)[i]].longitude
          selectOptions[i]={value: result[Object.keys(result)[i]].name, label: result[Object.keys(result)[i]].name}
        }
        setOptions(selectOptions) 
        setOptionsLoaded({"continue" : true})
        setCities(optionsData);
      });
    }
    fetchCities();
  }, [])
  
  const fetchWeek = async (lat, lon) => {
    await fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result)
      setDay({"continue" : 'undefined'})
    });
  }

  const fetchDay = async () => {
    await fetch(`${process.env.REACT_APP_LOCAL_API_URL}get/city/byname?name=${currCity}`)
    .then(res => res.json())
    .then(result => {
      if(typeof result.latitude !== 'undefined' && typeof result.longitude !== 'undefined'){
       fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${result.latitude}&lon=${result.longitude}&exclude=current,minutely,daily,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setDay(result);
        });
      }
    });
  }
      
  return (
    <div className="App">
      <h1>Weather React App</h1>
      {(typeof optionsLoaded.continue != 'undefined') ? (
        <div className="search-box">
          <label class="label-city" for="city-name">Search for your area*:</label>
          <Select class="city-name" options={options} 
          onChange={event => search(event)}
          />
        </div>
        ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
        )}
    {(typeof data.daily != 'undefined') ? (
      <div class="week" onClick={fetchDay}>
        <h2>Weekly forecast for {currCity}</h2>
         <Week weatherData={data}/>
      </div>
    ): (
      ''
   )}

    {(typeof day.hourly != 'undefined') ? (
      <div class="day">
        <h2>Hourly forecast for {currCity}</h2>
         <div class="slider">
            <Day dayData={day}/>
         </div>
      </div>
    ): (
      ''
   )}
  
</div>
  );
}

