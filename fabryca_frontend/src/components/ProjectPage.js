import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



function ProjectPage() {
    const [ticketList, setTicketList] = useState([]);
    const projName = localStorage.getItem('projectName');

    const getProjectData = async () => {
        const ticketResponse = await fetch(`https://localhost:7076/api/Tickets`);
        const ticketData = await ticketResponse.json();

        const projectResponse = await fetch(`https://localhost:7076/api/Projects`);
        const projectData = await projectResponse.json();

        const projId = projectData.filter(x => x.name === projName)[0].id;

        const projtickets = ticketData.filter(x => x.projectId === projId);
        setTicketList(await projtickets);

      }
    
    useEffect(() => {
        getProjectData();
    }, [])
  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <Navbar></Navbar>
        <h1>{projName}</h1>
        {ticketList.map(ticket =>(
            <h2>{ticket.title}, {ticket.createdAt}</h2>
        ))}


      </div>
    </div>
    </ThemeProvider>
  );
}

export default ProjectPage;