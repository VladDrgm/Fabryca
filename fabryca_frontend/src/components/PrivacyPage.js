// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import {  ThemeProvider } from '@react95/core'

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