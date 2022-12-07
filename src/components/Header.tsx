import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoHome } from 'react-icons/go'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import "./Header.css"

const Header = () => {

  const [hoverHome, setHoverHome] = useState(false);
  const [hoverList, setHoverList] = useState(false);

  const handleMouseOverHome = () => {
    setHoverHome(true);
  };

  const handleMouseOutHome = () => {
    setHoverHome(false);
  };

  const handleMouseOverList = () => {
    setHoverList(true);
  };

  const handleMouseOutList = () => {
    setHoverList(false);
  }



  return (
    <div className="Header">
      <div className="title">
          <h1>BUDGET BON VOYAGE</h1>
      </div>

      <div className="nav-btns">
        <div className="home-nav-btn">
          <Link to="/">
            <button className="home-button" onMouseOver={handleMouseOverHome} onMouseOut={handleMouseOutHome}>
              <GoHome size={20}/>
            </button>
          </Link>
          {hoverHome && (
            <div className="home-text">
              Home
            </div>
          )}
        </div>

        <div className="list-nav-btn">
          <Link to="/addlist">
            <button className="list-button" onMouseOver={handleMouseOverList} onMouseOut={handleMouseOutList}>
              <AiOutlineUnorderedList size={20}/>
            </button>
          </Link>
          {hoverList && (
            <div className="list-text">
              Add List
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Header
