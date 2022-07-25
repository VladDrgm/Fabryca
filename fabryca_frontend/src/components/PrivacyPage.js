// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import TicketCard from './TicketCard';
import Board from './Board';
import { BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';

function PrivacyPage() {
  
  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <h1>privacy page</h1>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default PrivacyPage;