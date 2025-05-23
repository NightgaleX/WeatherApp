import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>

      <div>
        <h1 id="header">WeatherApp</h1>
      </div>
      <div id="container">
        <div >
          <input id="Searchbar" placeholder="Enter location" />
          <button id="Submit" type="submit">Search</button>
        </div>
      </div>
      async function getWeather() {
        //input tas vid klick på submitknapp och sätts i inputvariabel
        // inkommande data från input
        //input blir city
        //restAPI url till variabel
        //fetchar rest API med input på cityvariabel
        //errorhandling
        //tar emot response
        //behandlar json för print
        //printa ut resultat 
        // ?????
        //PROFIT!!!1!1!1
        const url = "http://goweather.xyz/weather/{city}"
      const response = await fetch(url);

    </>
  )
}

export default App
