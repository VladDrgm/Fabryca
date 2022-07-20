import React, {useEffect, useState} from 'react';
import './TicketCard.css';

const TicketCard = ({ticket}) => {
  
  return(
    <article className='ticket'>
      <header className='ticket__header'>
      <h3>{ticket.Title}</h3>
      <div> </div>
    </header>
    <section className='ticket__body'>
    <p>{ticket.description}</p>
    <p>{ticket.createdAt}</p>
    </section>
  </article>
  )
}

export default TicketCard;