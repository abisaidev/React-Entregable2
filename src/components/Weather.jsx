import axios from 'axios';
import React, { useEffect, useState } from 'react';
import d_clear_sky from '../images/d_clear_sky.png'
import d_few_clouds from '../images/d_few_clouds.png'
import d_scattered_clouds from '../images/d_scattered_clouds.png'
import d_broken_clouds from '../images/d_broken_clouds.png'
import d_shower_rain from '../images/d_shower_rain.png'
import d_rain from '../images/d_rain.png'
import d_thunderstorm from '../images/d_thunderstorm.png'
import d_snow from '../images/d_snow.png'
import d_mist from '../images/d_mist.png'
import n_clear_sky from '../images/n_clear_sky.png'
import n_few_clouds from '../images/n_few_clouds.png'
import n_scattered_clouds from '../images/n_scattered_clouds.png'
import n_broken_clouds from '../images/n_broken_clouds.png'
import n_shower_rain from '../images/n_shower_rain.png'
import n_rain from '../images/n_rain.png'
import n_thunderstorm from '../images/n_thunderstorm.png'
import n_snow from '../images/n_snow.png'
import n_mist from '../images/n_mist.png'

const Weather = () => {

    const bgs = [
        {id: '01d', bg: d_clear_sky, time: 'd'},
        {id: '02d', bg: d_few_clouds, time: 'd'},
        {id: '03d', bg: d_scattered_clouds, time: 'd'},
        {id: '04d', bg: d_broken_clouds, time: 'd'},
        {id: '09d', bg: d_shower_rain, time: 'd'},
        {id: '10d', bg: d_rain, time: 'd'},
        {id: '11d', bg: d_thunderstorm, time: 'd'},
        {id: '13d', bg: d_snow, time: 'd'},
        {id: '50d', bg: d_mist, time: 'd'},
        {id: '01n', bg: n_clear_sky, time: 'n'},
        {id: '02n', bg: n_few_clouds, time: 'n'},
        {id: '03n', bg: n_scattered_clouds, time: 'n'},
        {id: '04n', bg: n_broken_clouds, time: 'n'},
        {id: '09n', bg: n_shower_rain, time: 'n'},
        {id: '10n', bg: n_rain, time: 'n'},
        {id: '11n', bg: n_thunderstorm, time: 'n'},
        {id: '13n', bg: n_snow, time: 'n'},
        {id: '50n', bg: n_mist, time: 'n'}
    ];
    const bgsContainer = [
        {color: '#e89362', time: 'd'},
        {color: '#42526e', time: 'n'}
    ] 

    const [ weather, setWeather ] = useState({});
    const [ degrees, setDegrees ] = useState(true);
    const celsius =  Math.round(weather.main?.feels_like - 273.15)
    const fahrenheit = Math.round(((weather.main?.feels_like - 273.15) * 9/5) + 32)
    const waIcon = weather.weather?.[0].icon

    useEffect(() => {
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6ea000ec8f4dce4564f91a8ae851c7ab`)
            .then(res => setWeather(res.data))
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    for( let i in bgs ){
        if( waIcon === bgs[i].id ){
            document.querySelector('.App').style = `background-image: url(${bgs[i].bg})`
            for(let it in bgsContainer){
                if(waIcon[2] === bgsContainer[it].time){
                    document.querySelector('.app-container').style = `background-color: ${bgsContainer[it].color}`
                }else{

                }
            }
        }else{
            
        }
    }

    const degreesToggle = () => setDegrees(!degrees);    

    console.log(weather)

    return (
        <div className='app-container'>
            <h1>weather-app</h1>
            <div className="current-icon-wa">
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            </div>
            <div className="main-wa">
                <h2>{weather.weather?.[0].main}</h2>
                <p>{weather.weather?.[0].description}</p>
                <p style={{padding: '0.5rem', fontSize: '1.2rem'}}><b>{weather.name}, {weather.sys?.country}</b></p>
                <p style={{fontSize: '4rem'}}><b>{degrees ? `${celsius} °C` : `${fahrenheit} °F`}</b></p>
            </div>
            <div className="btn-container">
                <p>Current temperature unit: {degrees ? 'Celsius' : 'Fahrenheit'}</p>
                <button onClick={degreesToggle}>Change to {degrees ? 'Fahrenheit' : 'Celsius'}!</button>
            </div>
        </div>
    );
};

export default Weather;