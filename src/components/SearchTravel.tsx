import React from "react";
import { useContext, useEffect, useState } from "react";
import { getHotels } from "../services/YelpApi";
import { getResturants } from "../services/YelpApi";
import { getReviews } from "../services/YelpApi";
import { Business } from "../models/Business";
import axios from "axios";





export function SearchTravel(){

  const options = [
    {value: '', text: '--Choose an option--'},
    {value: 'Hotel', text: 'Hotel'},
    {value: 'restaurant', text: 'Restaurant'},
  ]

 
  const [locationValue, setLocationValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  //const [selected, setSelected] = useState(options[0].value);
  const [activityValue, setActivityValue] = useState(options[0].value);
  const [results, setResults] = useState<Business[]>([])
  

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log(event.target.value);
    setActivityValue(event.target.value);
  };
  const onSubmit =(e:any)=>{
    e.preventDefault()
    console.log(locationValue, priceValue, activityValue);
    const fetch = async () =>{ 
    try{ 
      const res = activityValue === "hotel" ? await getHotels(locationValue, priceValue): await getResturants(locationValue, priceValue);
      setResults(res.businesses)
      } catch (err){
     
      }      
    }  
    fetch();
  }

  return(
    <div className="searchContainer">
      <form className="searchForm"> 
        <h1>So Where are you off to?</h1>
        <select value={activityValue} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
        </select>   
        <input className= "searcLocationhInput"   onChange={(e)=> setLocationValue(e.target.value)}/> 
        {/* <input className= "searchInput"  onChange={(e)=> setActivityValue(e.target.value)}/>   */}
        <h3>What's In Your Wallet?</h3>
        <input type="checkbox" value= "1" onChange={(e)=> setPriceValue(Number(e.target.value))}/> $<br/>
        <input type="checkbox" value= "2" onChange={(e)=> setPriceValue(Number(e.target.value))} /> $$<br/>
        <input type="checkbox"  value= "3"onChange={(e) => setPriceValue(Number(e.target.value))}/> $$$<br/>
        <input type="checkbox"  value= "4"onChange={(e)=> setPriceValue(Number(e.target.value))}/> $$$$<br/>
        <button className= "searchButton" onClick={(e)=> onSubmit(e)}>Search</button>
      </form> 
      {results.map(result => 
      <div>{result.name} - {result.price}</div>
      )}
      </div>  
    );
}


    


 
export default SearchTravel