import React from "react";
import { useContext, useEffect, useState } from "react";
import { getHotels, getNightlife, getResturants, getBeautySpas, getShopping } from "../services/YelpApi";
import { Business } from "../models/Business";
import { AddListContext } from "../context/AddListContext";
import { Link } from 'react-router-dom'
import { deleteFromFavorites, postToFavorites } from "../services/DbApi";
import "./SearchTravel.css"
import { RiAddFill } from 'react-icons/ri'
import { TiMinus } from 'react-icons/ti'
import { GiRoundStar } from 'react-icons/gi'
import { IoSearchOutline } from 'react-icons/io5'



export function SearchTravel(){


  const options = [
    {value: '', text: '--Choose an option--'},
    {value: 'Hotel', text: 'Hotels'},
    {value: 'Restaurant', text: 'Restaurants'},
    {value: 'Nightlife', text: 'Night Life'},
    {value: 'Beauty & Spas', text: 'Beauty & Spas'},
    {value: 'Shopping', text: 'Places to Shop'},

  ]

 
  const [locationValue, setLocationValue] = useState("");
  const [priceValue, setPriceValue] = useState<number>(0);
  
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



     const onSubmit =(e:any)=>{
      e.preventDefault()
    console.log(locationValue, priceValue, activityValue);
    const fetch = async () =>{ 
          if(activityValue === "Hotel"){
            try{
            const res = await getHotels(locationValue, priceValue);
            setResults(res.businesses)
            }
            catch(err){}
          }
          
          if(activityValue === "Restaurant"){
            try{
            const res = await getResturants(locationValue, priceValue);
            setResults(res.businesses)
            }
            catch(err){}
          }
          
          if(activityValue === "Nightlife"){
            try{
              const res = await getNightlife(locationValue, priceValue);
              setResults(res.businesses)
            }
            catch(err){}
          }

          if(activityValue === "Beauty & Spas"){
            try{
              const res = await getBeautySpas(locationValue, priceValue);
              setResults(res.businesses)
            }
            catch(err){}
          }

          if(activityValue === "Shopping"){
            try{
              const res = await getShopping(locationValue, priceValue);
              setResults(res.businesses)
            }
            catch(err){}
          }
       
       }
        fetch()
       }

     

    return(
      <div className="searchContainer">

         <form className="searchForm"> 
            <h1>So Where Are you Off To?</h1>

            <select className="category-box"value={activityValue} onChange={handleChange}>
           {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
                
            
         
      <input className= "searcLocationhInput"   onChange={(e)=> setLocationValue(e.target.value)} placeholder="Enter City"/> 
      {/* <input className= "searchInput"  onChange={(e)=> setActivityValue(e.target.value)}/>   */}
      
        <h3>What's In Your Wallet?</h3>

  <input type="checkbox" value= "1" onChange={(e)=> setPriceValue(Number(e.target.value))}/> $<br/>
  <input type="checkbox" value= "2" onChange={(e)=> setPriceValue(Number(e.target.value))} /> $$<br/>
  <input type="checkbox"  value= "3"onChange={(e) => setPriceValue(Number(e.target.value))}/> $$$<br/>
  <input type="checkbox"  value= "4"onChange={(e)=> setPriceValue(Number(e.target.value))}/> $$$$<br/>

<button className= "searchButton" onClick={(e)=> onSubmit(e)}><IoSearchOutline />   Search</button>



      </form> 
       <div className="results-container">
      {results.map((result) => {
      return(
        <div className="SearchList">
          <img className="result-image" src={result.image_url} alt={result.name}></img>
          <p className="result-name">{result.name}</p>
          <div className="rating-price">
            <p><GiRoundStar color="#ffae42" />     {result.rating}</p>
            <p className="result-price">Price: {result.price}</p>
          </div>
          <div className="details-add-button">
          <Link to={`/details/${result.id}`}><button className="view-details">View Details</button></Link>
          <br />
          {check(result.id) ? ( // call the check function and pass the place id (business id) and if it's already inside of our list array, this will become true and it will be removed. If it is not, it means it is false, and it will be added to the list array. This prevents it from adding multiple places into their list.
          
              <button className="remove-button" onClick={() => (removeFromList(result, result.id), deleteFromFavorites(result))}><TiMinus size={10}/>     Remove</button>
            ) : (
              <button className="add-button" onClick={() => (addToList(result), postToFavorites(result))}><RiAddFill size={13}/>     Add</button>

          )}
        </div>
        </div>
      ) 
      })}
    </div>
 
      </div>  
    );
    
}

export default SearchTravel
