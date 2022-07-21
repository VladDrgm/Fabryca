import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Button, ThemeProvider } from '@react95/core'
import TicketCard from './components/TicketCard';
import NewTicketPage from './components/NewTicketPage';
import Board from './components/Board';
import BoardPage from './components/BoardPage';
import PrivacyPage from './components/PrivacyPage';
import FaqPage from './components/FaqPage';
import EditTicketPage from './components/EditTicketPage'
import { BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';



function App() { 


  return (

      <Router>
        <Routes>
          <Route exact path="" element={<BoardPage/>}/>
          <Route exact path="/home" element={<BoardPage/>}/>
          <Route exact path="/privacy" element={<PrivacyPage/>}/>
          <Route exact path="/faq" element={<FaqPage/>}/>
          <Route exact path="/new" element={<NewTicketPage/>}/>
          <Route exact path="/edit" element={<EditTicketPage/>}/>
        </Routes>
      </Router>

  );
}

export default App;