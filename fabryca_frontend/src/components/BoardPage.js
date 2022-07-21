// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import { Link } from 'react-router-dom';
import Board from './Board';



function BoardPage() {

  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <Button className="navbar__button"><Link to="/new">Add a Ticket</Link></Button>
      <Board></Board>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default BoardPage;