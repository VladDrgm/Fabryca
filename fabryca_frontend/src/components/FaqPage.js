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
      <p>
        1) Why does this website look like this?
          A: We are 3 passionate developers with a feeling for nostalgia and vintage.
             We really like the idea of basing our design on Windows95 / Windows98.
             We were lucky and found a very good component library with React95; you can
             check it out here: <a href="https://github.com/React95/React95">Click here</a>
      </p>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default FaqPage;