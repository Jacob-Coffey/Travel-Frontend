import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import { DetailPage } from './components/DetailPage';
import Header from './components/Header';
import Search from './components/SearchTravel';
import AddListPage from './components/AddListPage';


function App() {
  return (
    <div className="App">
      <Router>
          <Header></Header>
        <Routes>
          <Route path='/' element={<Search/>}/>
          <Route path='/details/:id' element={<DetailPage/>}/>
          <Route path='/list' element={<AddListPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
