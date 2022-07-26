import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import {  ThemeProvider } from '@react95/core';
import EditTicketForm from './EditTicketForm';

function EditTicketPage() {

  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <EditTicketForm></EditTicketForm>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default EditTicketPage;