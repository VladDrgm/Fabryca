// import logo from './logo.svg';
// import './App.css';
// import React from 'react'; 
// import { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import { Button, ThemeProvider } from '@react95/core'
// import TicketCard from './components/TicketCard';
// import TicketForm from './components/TicketForm';
// import Board from './components/Board';



// function App() {
//   const [ticketList, setTicketList] = useState([]);

//   const getTicketData = async () => {
//     const response = await fetch('https://localhost:7076/api/Tickets/');
//     const data = await response.json();
//     setTicketList(data)
//   }



//   // useEffect(() => {
//   //   categoryList.forEach(category => {
//   //     // iterate over each categoryobject.
//   //     // find the matching tickets
//   //     // create a new object where the key
//   //   });
//   // },[ticketList])
  
//   useEffect(() => {
//     getTicketData()
//   }, []);
//   // <TicketForm ticketList={ticketList} setTicketList={setTicketList}/>
//   // {ticketList.map(ticket =>
//   //   ( <TicketCard ticket={ticket} ticketList={ticketList} setTicketList={setTicketList} key={ticket.createdAt}/> ))}    


//   return (
//     <ThemeProvider>
//     <div className="App" id="outer-container">
//       <div id="page-wrap">
//       <Navbar></Navbar>
//       <TicketForm ticketList={ticketList} setTicketList={setTicketList}/>
//       {ticketList.map(ticket =>
//         ( <TicketCard ticket={ticket} ticketList={ticketList} setTicketList={setTicketList} key={ticket.createdAt}/> ))}    
//       <Board> </Board>
//       </div>
//     </div>
//     </ThemeProvider>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Button, ThemeProvider } from '@react95/core'
import TicketCard from './components/TicketCard';
import TicketForm from './components/TicketForm';
import Board from './components/Board';
import BoardPage from './components/BoardPage';
import { BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';



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
          <Route exact path="/privacy" element={<TicketForm/>}/>
          <Route exact path="/faq" element={<TicketForm/>}/>
          <Route exact path="/new" element={<TicketForm/>}/>
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