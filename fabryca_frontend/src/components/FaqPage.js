// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import { ThemeProvider } from '@react95/core'

function FaqPage() { 

  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <h1>Faq page</h1>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default FaqPage;