"use client"

import { useState, useEffect } from "react"

// ersten Buchstaben der Stadt groß schreiben
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Weatherapp() {
    // state für den Namen der gesuchten Stadt
    const [myCityName, setMyCityName] = useState("")
  
    // State für die Liste der abgerufenen Städte
    const [ myCity, setMyCity ] = useState([])
    
    // constant für den API Endpunkt und Key
    const constants = {
        openWeatherMap: {
            BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?q=',
            SECRET_KEY: 'bd0a4ee3d928010babd0d4abb9b6e88f' // enter your api key here
        }
    }
    // Funktion zum Zusammenstellen der API Url incl Deutschland
    const weatherData = (address) => {
        const url = constants.openWeatherMap.BASE_URL 
                    + encodeURIComponent(address) 
                    + '&lang=de&appid=' 
                    + constants.openWeatherMap.SECRET_KEY;
        return url;
    };
    // Funktion zum Abruff der Wetterdaten und aktualisieren des State
    const handleAddCity = () => {
        // endgültige Generierung der api URL
        const url = weatherData(myCityName);
        // HTTP-GET Request mit der URL
        fetch(url)
        .then(response => {
            // Überprüfe ob Antwort vom Server iO ist
            if (!response.ok) {
                throw new Error('Fehler beim Abruf');
            }
            // gibt die Antwort des Servers als JSON aus
            return response.json();
        })
        .then(data => {
            // extrahiert Daten aus der Antwort
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            // Spielerei: Großschreibung des ersten Buchstabens der Stadt für die Anzeige

            const capitalizedCityName = capitalizeFirstLetter(myCityName);

            // Füge die abgerufenen Wetterdaten zum State hinzu
            setMyCity([...myCity, { 
                id: myCity.length + 1, 
                description: `${capitalizedCityName} - ${weatherDescription}`,
                temp: temperature,
                humidity: humidity
         }]);
        //  Eingabefeld für Stadt wird wieder geleert
            setMyCityName("");
        })
        .catch(error => {
            // Bei einem Fehler beim Abrufen der Daten, logge den Fehler
            console.log("Es gab ein Problem beim Fetchn:", error.message);
        });
    };

  
    let testCss = {
      padding: "50px"
    }
  
    // 👇 this is an event handler for input City
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
