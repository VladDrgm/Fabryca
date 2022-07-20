import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Button, ThemeProvider } from '@react95/core'
import TicketCard from './components/TicketCard';
import NewTicketPage from './components/NewTicketPage';
import Board from './components/Board';
import BoardPage from './components/BoardPage';
import PrivacyPage from './components/PrivacyPage';
import FaqPage from './components/FaqPage';
import { BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';



function App() {
  // const [ticketList, setTicketList] = useState([]);

  // const getData = async () => {
  //   const response = await fetch('https://localhost:7076/api/FabrykaDb/');
  //   const data = await response.json();
  //   console.log("Fetching data: ", data)
  //   setTicketList(data)
  // }
  
  // useEffect(() => {
  //   getData()
  // }, []);
  // <TicketForm ticketList={ticketList} setTicketList={setTicketList}/>
  // {ticketList.map(ticket =>
  //   ( <TicketCard ticket={ticket} ticketList={ticketList} setTicketList={setTicketList} key={ticket.createdAt}/> ))}    


  return (
    // <ThemeProvider>
    // <div className="App" id="outer-container">
    //   <div id="page-wrap">
    //   <Navbar></Navbar>
      <Router>
        <Routes>
          <Route exact path="" element={<BoardPage/>}/>
          <Route exact path="/home" element={<BoardPage/>}/>
          <Route exact path="/privacy" element={<PrivacyPage/>}/>
          <Route exact path="/faq" element={<FaqPage/>}/>
          <Route exact path="/new" element={<NewTicketPage/>}/>
          {/* <TicketForm></TicketForm> */}
          {/* <TicketForm ticketList={ticketList} setTicketList={setTicketList}/> */}
          {/* {ticketList.map(ticket =>
            ( <TicketCard ticket={ticket} ticketList={ticketList} setTicketList={setTicketList} key={ticket.createdAt}/> ))}     */}
          {/* <Board></Board> */}
        </Routes>
      </Router>
    //   </div>
    // </div>
    // </ThemeProvider>
  );
}

export default App;