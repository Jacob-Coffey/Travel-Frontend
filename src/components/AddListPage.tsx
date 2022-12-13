import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddListContext } from '../context/AddListContext'
import { Business } from '../models/Business'
import { deleteFromFavorites, getFavoritesList } from '../services/DbApi'
import "./AddListPage.css"
import { GiRoundStar } from 'react-icons/gi'
import { TiMinus } from 'react-icons/ti'


const AddListPage = () => {

  const { lists, removeFromList, count } = useContext(AddListContext)

  
  let dollarTotal = count * 10

  const check = (id: string) => {
    const boolean = lists.some((business) => business.id === id);
    return boolean;
  }

  return (
    <div className="list-container">
      <div className="budget-addlist-container">
      <div className="budget">
        <h2>Total needed for trip: {dollarTotal} </h2>
      </div>
            {lists.length > 0 ? (lists.map((list, i) => (
          <div className="AddList" key={i}>
            <img className="list-image" src={list.image_url} alt={list.name}></img>
            <p className="list-name">{list.name}</p>
          <div className="list-rating-price">
            <p><GiRoundStar color="#ffae42" />     {list.rating}</p>
            <p className="list-price">Price: {list.price}</p>
          </div>
          <div className="list-details-add-button">
              <Link to={`/details/${list.id}`}><button className="list-view-details">View Details</button></Link>
              {check(list.id) ? (
              <button className="list-remove-button"onClick={() => (removeFromList(list, list.id), deleteFromFavorites(list))}><TiMinus size={10}/>  Remove</button>
              ) : (
              <h1></h1>
              )}
          </div>
          </div>
        ))
        ) : (
        <h1>LIST IS EMPTY</h1>
        )}
    </div>
  </div>
  )
}

export default AddListPage
