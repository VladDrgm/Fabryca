import React, {useEffect, useState} from 'react';
import './TicketCard.css';
import './Board.css';
import { Button } from '@react95/core';
import { Link } from 'react-router-dom';

const TicketCard = ({ticket, ticketList, setTicketList}) => {

  const deleteToDatabase = async () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title
    
    const response = fetch(url,{
      method: 'DELETE',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    if ((await response).ok) {
      const newList = ticketList.filter( t => t.title != ticket.title);
      console.log(newList);
      setTicketList(newList)
    }
  };

  const makeOngoing = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Ongoing'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
          }
    )
    updateState('Ongoing');

  };

  const makePlanned = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Planned'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState('Planned');
  };

  const makeCompleted = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Completed'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState('Completed');
  };

  const updateState = (newCategory) => {
    // const ticketCopy = ticket;
    // ticketCopy.categoryName = "Completed"
    console.log(ticketList)
    const updatedList = ticketList.map(
      el => el.title === ticket.title ? { ...el, categoryName: newCategory } : el
    )
    setTicketList(updatedList);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteToDatabase();
  }

  const handleMakeOngoing = (e) => {
    e.preventDefault();
    makeOngoing();
  }

  const handleMakePlanned = (e) => {
    e.preventDefault();
    makePlanned();
  }

  const handleMakeCompleted = (e) => {
    e.preventDefault();
    makeCompleted();
  }
  
  return(
    <article className='ticket__card'>

      <header className='ticket__header'>
        <Button className='ticket__card--edit'><Link to='/edit'>Edit</Link></Button>
        <h4>Title:</h4>
        <h3>{ticket.title}</h3>
      </header>

      <section className='ticket__body'>
        <h4>Description:</h4>
        <p className='ticket__description'>{ticket.description}</p>
        <h4>Created At:</h4>
        <p className='ticket__date'>{ticket.createdAt}</p>
        <div className='ticket__buttons'>
          <Button onClick={handleDelete}>Delete</Button>
          {ticket.categoryName === 'Planned' ? <Button onClick={handleMakeOngoing}>Ongoing</Button> : null}
          {ticket.categoryName === 'Ongoing' ? 
            <div>
              <Button onClick={handleMakePlanned}>Planned</Button>
              <Button onClick={handleMakeCompleted}>Completed</Button> 
            </div>
          : null} 
          {ticket.categoryName === 'Completed' ? <Button onClick={handleMakeOngoing}>Ongoing</Button> : null}
        </div>
      </section>

  </article>
  )
}

export default TicketCard;
