import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import {useState, useEffect } from 'react';
import { Button } from '@react95/core'
import TicketCard from './components/TicketCard';
import TicketForm from './components/TicketForm';



function App() {
  const [ticketList, setTicketList] = useState([]);

  const getData = async () => {
    const response = await fetch('https://localhost:7076/api/FabrykaDb/');
    const data = await response.json();
    console.log("Fetching data: ", data)
    setTicketList(data)
  }
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="App">
      <TicketForm ticketList={ticketList} setTicketList={setTicketList}/>
      {ticketList.map(ticket =>
        ( <TicketCard ticket={ticket} ticketList={ticketList} setTicketList={setTicketList} key={ticket.createdAt}/> ))}    
    </div>
  );
}

export default App;
