import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import "./Header.css"
import { signInWithGoogle, signOut } from "../firebaseConfig";
import AuthContext from '../context/AuthContext';
import logoImg from '../logo-png.png'

const Header = () => {

  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverList, setHoverList] = useState(false);
  const [hoverSignOut, setHoverSignOut] = useState(false);

  const handleMouseOverSearch = () => {
    setHoverSearch(true);
  };

  const handleMouseOutSearch = () => {
    setHoverSearch(false);
  };

  const handleMouseOverList = () => {
    setHoverList(true);
  };

  const handleMouseOutList = () => {
    setHoverList(false);
  }

  const handleMouseOverSignOut = () => {
    setHoverSignOut(true);
  };

  const handleMouseOutSignOut = () => {
    setHoverSignOut(false);
  }

  const { user } = useContext(AuthContext);

  return (
    <div className="Header">
      <div className="logo-container">
        <img className="logo" src={logoImg} alt="logo"></img>
      </div>

        <div className="nav-btns">

        <div className="sign-in-container">
            { user ? <div className="welcome-container"><p className="welcome-text">Welcome {user?.displayName}</p>
                <div className="bleh">
                <button className="sign-out-button" onClick={signOut} onMouseOver={handleMouseOverSignOut} onMouseOut={handleMouseOutSignOut}><FiLogOut color="#ffae42" size={20} /></button>{hoverSignOut && (
                  <div className="sign-out-text">
                      Sign Out
                  </div>
              )}</div></div> :
                <div className="sign-in"><button className="sign-in-button" onClick={signInWithGoogle}><FcGoogle size={20} /></button><p className="sign-in-text">Sign In With Google</p></div>
            }
        </div>
        
        <div className="search-nav-btn">
            <Link to="/">
                <button className="search-button" onMouseOver={handleMouseOverSearch} onMouseOut={handleMouseOutSearch}>
                    <IoSearchOutline color="#ffae42" size={20}/>
                </button>
            </Link>
            {hoverSearch && (
                <div className="search-text">
                  Search
                </div>
            )}
        </div>

        <div className="list-nav-btn">
            <Link to="/addlist">
                <button className="list-button" onMouseOver={handleMouseOverList} onMouseOut={handleMouseOutList}>
                    <AiOutlineUnorderedList color="#ffae42" size={20}/>
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