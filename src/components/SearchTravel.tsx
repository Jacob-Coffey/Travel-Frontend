import React from "react";
import { useContext, useEffect, useState } from "react";
import { getHotels } from "../services/YelpApi";
import { getResturants } from "../services/YelpApi";
import { Business } from "../models/Business";
import { AddListContext } from "../context/AddListContext";
import { Link } from 'react-router-dom'
import { deleteFromFavorites, postToFavorites } from "../services/DBApi";




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


  const { lists, addToList, removeFromList } = useContext(AddListContext) //extracting these methods

  const check = (id: string) => { //create a method for the add to list button to change to remove from list and vice versa
    const boolean = lists.some((business) => business.id === id); //the some method checks whether at least one element inside of the array meets a condition. if the business id === to the id, it will return either false or true (teeter totters depending on the conditional statement shown below when function is called)
    return boolean
  }



    
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
  <input type="checkbox" value= "$" onChange={(e)=> convertPrice(e.target.value)}/> $<br/>
  <input type="checkbox" value= "$$" onChange={(e)=> convertPrice(e.target.value)} /> $$<br/>
  <input type="checkbox"  value= "$$$"onChange={(e) => convertPrice(e.target.value)}/> $$$<br/>
  <input type="checkbox"  value= "$$$$"onChange={(e)=> convertPrice(e.target.value)}/> $$$$<br/>

<button className= "searchButton" onClick={(e)=> onSubmit(e)}>Search</button>



      </form> 
       
      {results.map((result) => {
      return(
        <div className="SearchList">
          <p>{result.name}</p>
          <Link to={`/details/${result.id}`}>View Details</Link>
          <br />
          {check(result.id) ? ( // call the check function and pass the place id (business id) and if it's already inside of our list array, this will become true and it will be removed. If it is not, it means it is false, and it will be added to the list array. This prevents it from adding multiple places into their list.
              <button onClick={() => (removeFromList(result.id), deleteFromFavorites(result))}>Remove From List</button>
            ) : (
              <button onClick={() => (addToList(result), postToFavorites(result))}>Add To List</button>

          )}
        </div>
      ) 
      })}

 
      </div>  
    );
}
 
export default SearchTravel