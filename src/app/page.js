"use client"

import { useState, useEffect } from "react"

// ersten Buchstaben der Stadt groß schreiben
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Weatherapp() {
    const [myCityName, setMyCityName] = useState("")
  
    // query wenn wir was auslesen
    // mutation ist wenn wir unser state anpassen
    const [ myCity, setMyCity ] = useState([])
    
    const constants = {
        openWeatherMap: {
            BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?q=',
            SECRET_KEY: 'bd0a4ee3d928010babd0d4abb9b6e88f' // enter your api key here
        }
    }

    const weatherData = (address) => {
        const url = constants.openWeatherMap.BASE_URL 
                    + encodeURIComponent(address) 
                    + '&lang=de&appid=' 
                    + constants.openWeatherMap.SECRET_KEY;
        return url;
    };

    const handleAddCity = () => {
        const url = weatherData(myCityName);
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Abruf');
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const capitalizedCityName = capitalizeFirstLetter(myCityName);
            setMyCity([...myCity, { 
                id: myCity.length + 1, 
                description: `${capitalizedCityName} - ${weatherDescription}`,
                temp: temperature,
                humidity: humidity
         }]);
            setMyCityName("");
        })
        .catch(error => {
            console.log("Es gab ein Problem mit der Fetch-Operation:", error.message);
        });
    };

  
    let testCss = {
      padding: "50px"
    }
  
    // 👇 this is an event handler
    const handleCityInput = (event) => {
      const value = event.target.value
      setMyCityName(value)
    }

return (
    <div>
      <main>
        <h1 style={testCss}>Abi´s NextJS Weather</h1>
        <br />
        <p>Rufe hier das Wetter ab</p>
        <br />
        <input 
        value={myCityName}
        onInput={handleCityInput}
        style={{
          padding: "1rem",
          border: "1px solid #000",
          borderRadius: "5px",
          fontSize: "1.5rem"
        }} type="text" placeholder="Gebe eine Stadt ein" />
        <button 
        style={{
          padding: "1rem",
          border: "1px solid #000",
          borderRadius: "5px",
          fontSize: "1.5rem"
        }}
        onClick={handleAddCity}>Wetter abfragen</button>
        <br />
        <ul>
        {myCity.map(city => {
        console.log("Temperatur vor Runden:", city.temp); // Diese Zeile hinzufügen
        return (
        <li key={city.id}>
            {city.description} |
            Temperatur: {Math.round(city.temp - 273.15)}°C |
            Luftfeuchtigkeit: {city.humidity}%
        </li>
    );
})}

        </ul>
        <br />
        {/* 
        <Button 
        onClick={handleAddCity}
        text={"City hinzufügen"} 
        />
        */}
      </main>
    </div>
)
}
