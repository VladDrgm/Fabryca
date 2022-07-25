// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import TicketCard from './TicketCard';
import Board from './Board';
import TicketForm from './TicketForm';
import { BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';

function NewTicketPage() {

  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <TicketForm></TicketForm>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default NewTicketPage;