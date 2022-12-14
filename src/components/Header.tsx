import React, { useContext } from 'react'
import { Fade } from 'react-slideshow-image';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoSearchOutline } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'
import { VscSignOut } from 'react-icons/vsc'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import "./Header.css"
import { signInWithGoogle, signOut } from "../firebaseConfig";
import AuthContext from '../context/AuthContext';
import logoImg from '../logo-png.png'
import 'react-slideshow-image/dist/styles.css'

const Header = () => {

  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverList, setHoverList] = useState(false);
  const [hoverSignOut, setHoverSignOut] = useState(false);
  const location= useLocation()

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
  
  const images = [
    'https://images.pexels.com/photos/2291624/pexels-photo-2291624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5865071/pexels-photo-5865071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/11482094/pexels-photo-11482094.jpeg',
    'https://images.pexels.com/photos/374894/pexels-photo-374894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1179581/pexels-photo-1179581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/261043/pexels-photo-261043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];
  

  return (
    <div className="Header">

      <div className="slideshow-container">
      { location.pathname === "/" && 
        <div>
        <Fade>
          <div className="each-slide">
            <img className="first-hotel" src={images[0]} />
            <img className="second-hotel" src={images[1]} />
            <img className="third-hotel" src={images[2]} />
          </div>

          <div className="each-slide">
            <img className="first-restaurant" src={images[3]} />
            <img className="second-restaurant" src={images[4]} />
            <img className="third-restaurant"  src={images[5]} />
          </div>

          <div className="each-slide">
            <img className="first-shop" src={images[6]} />
            <img className="second-shop" src={images[7]} />
            <img className="third-museum" src={images[8]} />
          </div>

          <div className="each-slide">
            <img className="first-club" src={images[9]} />
            <img className="second-bar" src={images[10]} />
            <img className="third-bar" src={images[11]} />
          </div>
        </Fade>
      </div>
      }
      </div>

      <div className="everything-else">
      <div className="logo-container">
        <img className="logo" src={logoImg} alt="logo"></img>
      </div>

        <div className="nav-btns">

        <div className="sign-in-container">
            { user ? <div className="welcome-container"><p className="welcome-text">Welcome {user?.displayName}</p>
                <div className="sign-in-box">
                <button className="sign-out-button" onClick={signOut} onMouseOver={handleMouseOverSignOut} onMouseOut={handleMouseOutSignOut}><VscSignOut color="#ffae42" size={22} /></button>{hoverSignOut && (
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
    </div>
  )
}

export default Header