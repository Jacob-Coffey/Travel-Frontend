import React from "react";
import { useContext, useEffect, useState } from "react";
import { getHotels, getNightlife, getResturants, getBeautySpas, getShopping, getDetails } from "../services/YelpApi";
import { Business } from "../models/Business";
import { AddListContext } from "../context/AddListContext";
import { Link, useParams } from 'react-router-dom'
import { deleteFromFavorites, postToFavorites } from "../services/DbApi";
import "./SearchTravel.css"
import { RiAddFill } from 'react-icons/ri'
import { TiMinus } from 'react-icons/ti'
import { GiRoundStar } from 'react-icons/gi'
import { IoSearchOutline } from 'react-icons/io5'
import { BusinessInfo } from "../models/Details";



export function SearchTravel(){

  const options = [
    {value: '', text: '--Choose an option--'},
    {value: 'Hotel', text: 'Hotels'},
    {value: 'Restaurant', text: 'Restaurants'},
    {value: 'Nightlife', text: 'Night Life'},
    {value: 'Beauty & Spas', text: 'Beauty & Spas'},
    {value: 'Shopping', text: 'Shopping'},

  ]

 
  const [locationValue, setLocationValue] = useState("");
  const [priceValue, setPriceValue] = useState<number>(0);
  
  //const [selected, setSelected] = useState(options[0].value);
  const [activityValue, setActivityValue] = useState(options[0].value);
  const [results, setResults] = useState<Business[]>([])
  const [business, setBusiness] = useState<BusinessInfo>();

  const id: string = String(useParams().id);

  useEffect(() => {
    getDetails(id).then(res => {
        setBusiness(res.data)
    })

}, [id]);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    console.log(event.target.value);
    setActivityValue(event.target.value);
  };
  
  const { lists, addToList, removeFromList } = useContext(AddListContext) 


  const check = (id: string) => { 
    const boolean = lists.some((business) => business.id === id); 
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
            <h2>So Where Are you Off To?</h2>

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
          {check(result.id) ? ( 
          
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
