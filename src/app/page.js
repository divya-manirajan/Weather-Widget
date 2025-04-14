'use client'

import { Info, Wind } from "lucide-react";
import { useState } from "react";

export default function page() {
  const [location, setLocation] = useState("")
  const [moreInfo, setMoreInfo] = useState(false)
  const [results, setResults] = useState(
    {
      city: "",
      region:"",
      country:"",
      time:"",

      temp_f: "",
      feelslike_f:"",
      icon: "",
      text:"",

      cloud:"",
      humidity:"",
      heatindex_f: "",

      wind_mph: "",
      wind_degree: "",
      wind_dir: "",
      gust_mph:"",
      windchill_f:"",
    }
  )

  const getData = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`);
      const data = await response.json()
      console.log(data)
      setResults(
        {
          city: data.location.name,
          region: data.location.region,
          country: data.location.country,
          time: data.location.localtime,
    
          temp_f: data.current.temp_f,
          feelslike_f: data.current.feelslike_f,
          icon: data.current.condition.icon,
          text: data.current.condition.text,
    
          cloud: data.current.cloud,
          humidity: data.current.humidity,
          heatindex_f: data.current.heatindex_f,

          wind_mph: data.current.wind_mph,
          wind_degree: data.current.wind_degree,
          wind_dir: data.current.wind_dir,
          gust_mph: data.current.gust_mph,
          windchill_f: data.current.windchill_f
        }
      )
    } catch (e) {
      console.log(e)
      alert("Please Enter Valid City")
    }
  }
  const resultsEntries = Object.entries(results);
  return (
    
    <div className="h-screen flex justify-center items-center bg-blue-200">
      <div className="shadow-xl border-1 border-gray-100 rounded-2xl bg-white p-5"> 
        <form className="h-full w-full rounded-2xl text-center" onSubmit={getData}>
          <h1 className="font-serif font-semibold text-xl m-2">Weather Widget</h1>
          <input className="font-serif border-1 border-gray-200 h-[30px] rounded-lg m-1 pl-2" placeholder="Enter City..." onChange={(e) => {setLocation(e.target.value)}}></input>
          <button className="font-serif bg-black text-white h-[30px] rounded-lg m-l pl-2 pr-2">Submit</button>
        </form>

        <div className="w-full flex flex-col items-center font-serif">
            <p className="text-lg">{results.city}</p>

            {results.temp_f && <p className="text-3xl mb-2">{results.temp_f}&deg;F</p>}
            {results.feelslike_f && <p className="text-base">Feels Like: {results.feelslike_f}&deg;F</p>}

            {results.icon && results.text && <div className="flex flex-row items-center">
              <img src={results.icon}></img>
              <p className="min-w-[64px] text-center">{results.text}</p>
            </div>}

            {results.city && <Info className="w-5 h-5 text-blue-500" onClick={() => setMoreInfo(!moreInfo)}/>}
            
            {moreInfo && (
              <>
                {/* {results.region && results.country && <p>{results.region}, {results.country}</p>} */}
                <div id="wind-widget" className="w-full border-1 border-blue-200 shadow-xl rounded-4xl font-serif m-2 p-4">
                  <div className="w-full flex items-center">
                    <Wind className="h-5 w-5 mr-1" />
                    <p className="text-xs">WIND</p>
                  </div>
                  <div className="w-full flex justify-between mt-2">
                    <div className="flex flex-col">
                      <p>Wind: </p>
                      <p>Gusts: </p>
                      <p>Direction: </p>
                    </div>
                      
                    <div className="flex flex-col items-end">
                      <p>{results.wind_mph} mph </p>
                      <p>{results.gust_mph} mph</p>
                      <p>{results.wind_degree}&deg; {results.wind_dir}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

        </div>
      </div>
    </div>
  )
}
