import React from "react";
import { useContext, useEffect, useState } from "react";
import { getHotels } from "../services/YelpApi";
import { getResturants } from "../services/YelpApi";
import { getReviews } from "../services/YelpApi";
import { Business } from "../models/Business";
import axios from "axios";





export function SearchTravel(){

  // const options =[
  //   {value: '', text:'--What are you looking to do?--'},
  //   {value: 'Restaurants', text: 'Resturants'},
  //   {value: 'Hotel,', text:'Hotels'}
  // ]
  const [locationValue, setLocationValue] = useState("");
  const [priceValue, setPriceValue] = useState<number[]>([]);



    const [activityValue, setActivityValue] = useState("");

    const [results, setResults] = useState<Business[]>([])
    
    const convertPrice = (price:string)=>{
      console.log("console log price", price)
      if (price === "$"){
        
          const newArray:number[] = priceValue.filter(e => e !== 1)
         
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

    } 


     const onSubmit =(e:any)=>{
      e.preventDefault()
    console.log(locationValue, priceValue, activityValue);
    const fetch = async () =>{ 
    try{ 
      const res = activityValue === "Hotel" ? await getHotels(locationValue, priceValue): await getResturants(locationValue, priceValue);
    setResults(res.businesses)
          } catch (err){
     
          }
       
       }
        fetch()
       }

       
    //    const [locationValue, setLocationValue]= useState("");
    //    const [locationResults, setLocationResults] = useState<Business[]>([])
    //    e.preventDefault()
    // setLocationResults(e.target.value)
    //   }
    //  const onSubmit =(e: any)=>{
    // e.preventDefault()
    // const fetch = async () =>{
    // try{
    // const res =await getResturants(inputValue);
    // setLocationResults(res.businesses)
    //       } catch (err){
     
    //       }
       
    //    }
    //     fetch()
    //    }



 
 
 
    return(
      <div className="searchContainer">
        <form className="searchForm">
            <h1>So Where are you off to?</h1>
            
            {/* <select value={selected} onChange={setActivityValue}>
            {options.map(option =>(
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))} */}
           
            {/* </select> */}
      <input className= "searcLocationhInput"  onChange={(e)=> setLocationValue(e.target.value)}/> 
      <input className= "searchInput"  onChange={(e)=> setActivityValue(e.target.value)}/> 
      {/* <input className = "locationInput"></input> */}
        
        <h3>What's In Your Wallet?</h3>
  <input type="checkbox" value= "$" onChange={(e)=> convertPrice(e.target.value)}/> $<br/>
  <input type="checkbox" value= "$$" onChange={(e)=> convertPrice(e.target.value)} /> $$<br/>
  <input type="checkbox"  value= "$$$"onChange={(e) => convertPrice(e.target.value)}/> $$$<br/>
  <input type="checkbox"  value= "$$$$"onChange={(e)=> convertPrice(e.target.value)}/> $$$$<br/>

<button className= "searchButton" onClick={(e)=> onSubmit(e)}>Search</button>


      </form>
      {results.map(result => <p>{result.name}</p>)}
      {/* {results.map((result)=> {
       return(
        <div className="SearchList">
            {result.name}
            <li></li>

        </div>
      ) 
      })} */}
      
 
      </div>  
    );
}
 
export default SearchTravel