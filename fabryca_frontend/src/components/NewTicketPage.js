// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import { ThemeProvider } from '@react95/core'
import TicketForm from './TicketForm';

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