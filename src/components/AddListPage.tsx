import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AddListContext } from '../context/AddListContext'

const AddListPage = () => {

  const { lists, removeFromList } = useContext(AddListContext)
  const check = (id: string) => {
    const boolean = lists.some((business) => business.id === id);
    return boolean;
  }

  return (
    <div className="AddListPage">
            {lists.length > 0 ? (lists.map((list, i) => (
          <div key={i}>
            <div className="img-title">
              <p className="movie-title">{list.name}</p>
              <Link to={`/details/${list.id}`}>View Details</Link>
              </div>
              {check(list.id) ? (
              <button onClick={() => removeFromList(list.id)}>Remove</button>
            ) : (
            <h1></h1>
            /*<button onClick={() => addToList(list)}>
                Add To List
            </button>*/
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
