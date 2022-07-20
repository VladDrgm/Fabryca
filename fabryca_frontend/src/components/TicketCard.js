import React, {useEffect, useState} from 'react';
import './TicketCard.css';
import './Board.css';
import { Button } from '@react95/core'

const TicketCard = ({ticket}) => {

  const deleteToDatabase = async () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title
    
    const response = await fetch(url,{
      method: 'DELETE',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
  await response()
  console.log(response.ok)
  return response.ok
  };

  const makeOngoing = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Ongoing'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
          }
    )
  };

  const makePlanned = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Planned'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
  };

  const makeCompleted = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Completed'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
  };

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
    <article className='ticket'>
      <header className='ticket__header'>
      <h3>{ticket.title}</h3>
      <div> </div>
    </header>
    <section className='ticket__body'>
    <p>{ticket.description}</p>
    <p>{ticket.createdAt}</p>
    <Button onClick={handleDelete}>Delete</Button>
    {ticket.categoryName === 'Planned' ? <Button onClick={handleMakeOngoing}>Ongoing</Button> : null}
    {ticket.categoryName === 'Ongoing' ? 
      <div>
        <Button onClick={handleMakePlanned}>Planned</Button>
        <Button onClick={handleMakeCompleted}>Completed</Button> 
      </div>
    : null} 
    {ticket.categoryName === 'Completed' ? <Button onClick={handleMakeOngoing}>Ongoing</Button> : null}
    </section>
  </article>
  )
}

export default TicketCard;