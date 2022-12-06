import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { signInWithGoogle, signOut } from "./firebaseConfig";
import { SearchTravel } from './components/SearchTravel';
import userEvent from '@testing-library/user-event';
import AuthContext from './context/AuthContext';



function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      { user ? <h3>Welcome {user?.displayName} <button onClick={signOut}>Sign Out</button></h3> :
      <button onClick={signInWithGoogle}>Sign In With Google!</button>
  }
     <SearchTravel></SearchTravel>
    </div>
  );
}

export default App;
