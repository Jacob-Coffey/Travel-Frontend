import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddListContext } from '../context/AddListContext'
import { Business } from '../models/Business'
import { deleteFromFavorites, getFavoritesList } from '../services/DbApi'


const AddListPage = () => {

  const { lists, removeFromList, count } = useContext(AddListContext)

  
  let dollarTotal = count * 10

  const check = (id: string) => {
    const boolean = lists.some((business) => business.id === id);
    return boolean;
  }

  return (
    <div className="AddListPage">
      <h2>Total needed for trip: {dollarTotal} </h2>
            {lists.length > 0 ? (lists.map((list, i) => (
          <div key={i}>
            <div className="img-title">
              <p className="movie-title">{list.name}</p>
              <Link to={`/details/${list.id}`}>View Details</Link>
              {list.categories === "food" ?? <p>Estimated cost: {list.price.length * 10}</p>}
              </div>
              {check(list.id) ? (
              <button onClick={() => (removeFromList(list, list.id), deleteFromFavorites(list))}>Remove</button>
            ) : (
            <h1></h1>
            )}
          </div>
        )) 
        ) : (
        <h1>LIST IS EMPTY</h1>
        )}
        </div>
  )
}

export default AddListPage
