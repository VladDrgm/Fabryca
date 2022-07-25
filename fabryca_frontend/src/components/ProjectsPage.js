import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import { Button, ThemeProvider } from '@react95/core'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';



function ProjectsPage() {
    const [projectList, setProjectList] = useState([]);

    const getProjectsData = async () => {
        const response = await fetch(`https://localhost:7076/api/Projects`);
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
        {projectList.map((project) =>(
            <ProjectCard project={project} key={project.name}/>
        ))}

      </div>
    </div>
    </ThemeProvider>
  );
}

export default ProjectsPage;