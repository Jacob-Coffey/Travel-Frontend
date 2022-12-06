import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="Header">
        <div>
            <h1>BUDGET BON VOYAGE</h1>
        </div>

        <div>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/addlist">Added List</Link>
        </div>
    </div>
  )
}

export default Header
