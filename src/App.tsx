import React, { useState } from 'react';
import './App.css';
import { SearchTravel } from './components/SearchTravel';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { DetailPage } from './components/DetailPage';
import Header from './components/Header';
import AddListPage from './components/AddListPage';


function App() {

  return (
    <div className="App">
      <Router>
          <Header></Header>
        <Routes>
          <Route path='/' element={<SearchTravel/>} />
          <Route path='/details/:id' element={<DetailPage/>}/>
          <Route path='/addlist' element={<AddListPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
