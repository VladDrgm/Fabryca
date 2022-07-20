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

  const handleDelete = (e) => {
    e.preventDefault();
    deleteToDatabase();
  }
  
  return(
    <article className='ticket'>
      <header className='ticket__header'>
      <h3>{ticket.Title}</h3>
      <div> </div>
    </header>
    <section className='ticket__body'>
    <p>{ticket.description}</p>
    <p>{ticket.createdAt}</p>
    <Button onClick={handleDelete}>Delete</Button>
    </section>
  </article>
  )
}

export default TicketCard;