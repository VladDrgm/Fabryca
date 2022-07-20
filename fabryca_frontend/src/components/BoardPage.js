// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import TicketCard from './TicketCard';
import NewTicketPage from './NewTicketPage';
import Board from './Board';
import { BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';



function BoardPage() {
//   const [ticketList, setTicketList] = useState([]);

//   const getData = async () => {
//     const response = await fetch('https://localhost:7076/api/Tickets/');
//     const data = await response.json();
//     console.log("Fetching data: ", data)
//     setTicketList(data)
//   }
  
//   useEffect(() => {
//     getData()
//   }, []);
  // <TicketForm ticketList={ticketList} setTicketList={setTicketList}/>
  // {ticketList.map(ticket =>
  //   ( <TicketCard ticket={ticket} ticketList={ticketList} setTicketList={setTicketList} key={ticket.createdAt}/> ))}    


  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <Board></Board>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default BoardPage;