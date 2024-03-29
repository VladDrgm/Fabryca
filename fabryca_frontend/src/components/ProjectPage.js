import '../App.css';
import './ProjectPage.css';
import '../index.css';
import React from 'react'; 
import Navbar from './Navbar';
import {  ThemeProvider, Frame } from '@react95/core'
import { Link, useNavigate } from 'react-router-dom';
import Board2 from './Board2';
import CursorButton from './CursorButton';



function ProjectPage() {
    // const [ticketList, setTicketList] = useState([]);
    const projName = localStorage.getItem('projectName');
    const navigate = useNavigate();
    
    const deleteProject = async () => {
      const url = `https://fabrycaapi.azurewebsites.net/api/Projects/${projName}`;
    
      const response = fetch(url,{
        method: 'DELETE',
        mode: 'cors',
        headers:{'Content-type':'application/json'}
        }
      )
      if ((await response).ok) {
        navigate('/projects')
      }
    }

    // const getProjectData = async () => {
    //     console.log(projName);
    //     const ticketResponse = await fetch(`https://fabrycaapi.azurewebsites.net/api/Tickets/project/${projName}`);
    //     setTicketList( await ticketResponse.json());
    //   }
    
    // useEffect(() => {
    //     getProjectData();
    // }, [])
    
    // if (ticketList.length > 0) {
  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
        <Navbar></Navbar>
        <Frame className="project__page__title">
          <h1>{projName}</h1>
        </Frame>
          <div>
        <Link to="/new">
          <CursorButton type={'Pointer'} text={'Add a Ticket'} className="category__button" />
        </Link>
        <Link to="/newCategory">
          <CursorButton type={'Pointer'} text={'Add a Category'} className="category__button" />
        </Link>
        
          <CursorButton type={'Pointer'} text={'Delete Project'} className="category__button" onClick={deleteProject} />
        
        </div>
        <Board2 projectName={projName}></Board2>
      </div>
    </div>
    </ThemeProvider>
  );
  // } else {
  //   return (
  //     <ThemeProvider>
  //     <div className="App" id="outer-container">
  //       <div id="page-wrap">
  //         <Navbar></Navbar>
  //         <Frame className="project__page__title">
  //           <h1>{projName}</h1>
  //         </Frame>
  //         <div className="project__page__buttons">
  //         <Link to="/new" className="project__page__button">
  //             <CursorButton type={'Pointer'} text={'Add a Ticket'} />
  //           </Link>
  //         <Link to="/newCategory" className="project__page__button">
  //             <CursorButton type={'Pointer'} text={'Add a Category'}  />
  //             </Link>
  //         </div>
  //         <Frame className="project__page--no-tickets">
  //           <h2>No tickets for this project yet..</h2>
  //         </Frame>
  //       </div>
  //     </div>
  //     </ThemeProvider>
  //   );
  // }
}

export default ProjectPage;