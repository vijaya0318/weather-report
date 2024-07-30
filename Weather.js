import React, { useState } from 'react';
function Weather() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  function handleChange(event) {
    setCity(event.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.main && data.main.temp) {
        const celsius = (data.main.temp) - 273.15;
        setResult(`Temperature at ${city}\n${Math.round(celsius)}\u00B0C`);
        setCity("");
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  }

  return (
    <>
    
      <div className="border">
        <h2>Weather Report</h2><br/>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter city" value={city} onChange={handleChange} /><br /><br/>
          <input type="submit" value="Get Weather" />
        </form><br/><br/>
        <h3 className='result' style={{textAlign:"center"}}>{result}</h3>
      </div>
      <br/>
    </>
  );
}
export default Weather;