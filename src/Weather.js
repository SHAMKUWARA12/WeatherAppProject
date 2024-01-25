import React, { useState } from 'react';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SearchIcon from '@mui/icons-material/Search';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import axios from 'axios';
const Weather = () => {

    const [query, setQuery] = useState('');
    const searchInput = (event) => {
        setQuery(event.target.value)
        console.log(event.target.value)
    }

    const [resdata, setResData] = useState();
    const resultweather = () => {
        // setResData(alert("hi"));
        weatherdata();
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=84fe53e8a4a239c1b43251ac19247a1e&units=metric`

    async function weatherdata() {
        try {
            const response = await axios.get(url);
            setResData(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }



    return (
        <>
            <div className='centerdiv'>
                <div className='inputsearch' onClick={resultweather}>
                    <SearchIcon className='searchicon'
                    />
                    <input
                        type='text'
                        placeholder='Search'
                        className='cityinput'
                        onChange={searchInput}
                        value={query}
                    />
                </div>


                {
                    resdata === null || resdata === undefined ? (
                        <div className='nodatablock'>
                            <PriorityHighIcon className='nodataicon'/>
                            <p>No data found</p>
                        </div>
                    ) :

                        (<div className='weather_result'>
                            <div className='cityname'>
                                <AccessibilityIcon className='accicon' />
                                <h1>{resdata.name}</h1>
                            </div>
                            <div className='cityweather'>
                                <h2>{resdata.main.temp}°C</h2>
                                <h3>Min:{resdata.main.temp_min}°C | Max:{resdata.main.temp_max}°C</h3>
                            </div>

                        </div>)
                }
            </div>
        </>
    )
}
export default Weather