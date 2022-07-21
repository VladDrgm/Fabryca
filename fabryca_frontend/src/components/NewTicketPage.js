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
  // const [ticketList, setTicketList] = useState([]);

  // const getData = async () => {
  //   const response = await fetch('https://localhost:7076/api/Tickets/');
  //   const data = await response.json();
  //   console.log("Fetching data: ", data)
  //   // setTicketList(data)
  // }
  
 

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