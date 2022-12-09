import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import "./Header.css"
import { signInWithGoogle, signOut } from "../firebaseConfig";
import AuthContext from '../context/AuthContext';

const Header = () => {

  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverList, setHoverList] = useState(false);

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

  const { user } = useContext(AuthContext);

  return (
    <div className="Header">
        <div className="title">
          <h1>BUDGET BON VOYAGE</h1>
        </div>

        <div className="nav-btns">

        <div className="sign-in-nav-btn">
            { user ? <h3>Welcome {user?.displayName} 
                <button className="sign-out-button" onClick={signOut}><IoLogOutOutline size={22} /></button></h3> :
                <button className="sign-in-button" onClick={signInWithGoogle}><FcGoogle size={20} /></button>
            }
        </div>
        
        <div className="search-nav-btn">
            <Link to="/">
                <button className="search-button" onMouseOver={handleMouseOverSearch} onMouseOut={handleMouseOutSearch}>
                    <BsSearch size={18}/>
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