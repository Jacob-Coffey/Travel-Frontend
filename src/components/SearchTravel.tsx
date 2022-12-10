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
  const [priceValue, setPriceValue] = useState<number[]>([]);
  //const [selected, setSelected] = useState(options[0].value);
  const [activityValue, setActivityValue] = useState(options[0].value);
  const [results, setResults] = useState<Business[]>([])
  

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log(event.target.value);
    setActivityValue(event.target.value);
  };



    
    const convertPrice = (price:string)=>{
      console.log("console log price", price)
      if (price === "$"){
        
          const newArray:number[] = priceValue.filter(e => e !== 1)
          //newArray.push(1);
         
          priceValue.includes(1) ? setPriceValue(newArray): setPriceValue(priceValue=>[...priceValue, 1]) 
      }else if (price === "$$"){
        const newArray:number[] = priceValue.filter(e => e !== 2)
         
          priceValue.includes(2) ? setPriceValue(newArray): setPriceValue(priceValue=>[...priceValue, 2]) 
      }else if (price === "$$$"){
        const newArray:number[] = priceValue.filter(e => e !== 3)
         
          priceValue.includes(3) ? setPriceValue(newArray): setPriceValue(priceValue=>[...priceValue, 3]) 
      }else if (price === "$$$$"){
        const newArray:number[] = priceValue.filter(e => e !== 4)
         
          priceValue.includes(4) ? setPriceValue(newArray): setPriceValue(priceValue=>[...priceValue, 4]) 
      }
      //This function is sending it as [$, $$ $$$, $$$$] > [1,2,3,4] but its supposed to be 1,2,3,4... we believe so l0l --flatten an array? How to pull numbers 
      // from the array? 
      // When we send it in an array it looks like price=[]=2
//price=2



      



    } 

    
  


     const onSubmit =(e:any)=>{
      e.preventDefault()
    console.log(locationValue, priceValue, activityValue);
    console.log('Price Value', priceValue);
    //This is where we need to send it without the brackets. Possibly map through the array and pull out just the numbers
    const fetch = async () =>{ 
    try{ 
      const res = activityValue === "Hotel" ? await getHotels(locationValue, priceValue): await getResturants(locationValue, priceValue);
    setResults(res.businesses)
          } catch (err){
     
          }
       
       }
        fetch()
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
      {/* <input className= "searchInput"  onChange={(e)=> setActivityValue(e.target.value)}/>    */}
      
        
        <h3>What's In Your Wallet?</h3>
  <input type="checkbox" value= "$" onChange={(e)=> convertPrice(e.target.value)}/> $<br/>
  <input type="checkbox" value= "$$" onChange={(e)=> convertPrice(e.target.value)} /> $$<br/>
  <input type="checkbox"  value= "$$$"onChange={(e) => convertPrice(e.target.value)}/> $$$<br/>
  <input type="checkbox"  value= "$$$$"onChange={(e)=> convertPrice(e.target.value)}/> $$$$<br/>

<button className= "searchButton" onClick={(e)=> onSubmit(e)}>Search</button>


      </form> 
      {results.map(result => <p>{result.name}</p>)}
       
      
 
      </div>  
    );
}
 
export default SearchTravel