import React, {useEffect, useState} from 'react';
import './TicketCard.css';

const TicketCard = ({ticket, ticketList, setTicketList}) => {
  
  return(
    <div className='ticket-card'>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.createdAt}</p>
    </div>
  )
}

export default TicketCard;