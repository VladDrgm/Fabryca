import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import {  ThemeProvider } from '@react95/core'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import CursorButton from './CursorButton';



function ProjectsPage() {
    const [projectList, setProjectList] = useState([]);

    const getProjectsData = async () => {
        const response = await fetch(`https://fabrycaapi.azurewebsites.net/api/Projects`);
        const data = await response.json();
        setProjectList(data)
        console.log(data)
      }
    
    useEffect(() => {
        getProjectsData();
    }, [])
  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <Navbar></Navbar>
        <Link to='/newProject'>
            <CursorButton type={'Pointer'} text={'Start a New Project'}/>
        </Link>
        <br/>
        {projectList.map((project) =>(
            <ProjectCard project={project} key={project.name}/>
        ))}

      </div>
    </div>
    </ThemeProvider>
  );
}

export default ProjectsPage;