// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import { Link } from 'react-router-dom';
import Board from './Board';
import CursorButton from './CursorButton';



function BoardPage() {

  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <Link to="/new">
      <CursorButton type={'Pointer'} text={'Add a Ticket'} className="navbar__button" />
      </Link>
      <Board></Board>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default BoardPage;