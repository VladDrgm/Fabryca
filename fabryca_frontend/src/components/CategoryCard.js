import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import TicketCard from './TicketCard';
import { Frame } from '@react95/core';
// import { set } from 'cypress/types/lodash';


const CategoryCard = ({category, ticketList, setTicketList}) => {

  const [localTicketList, setLocalTicketList] = useState([]);

  const ticketSorter = data => {
    const sortedTicketArray = data.filter(ticket => ticket.categoryName === category.name)

    setLocalTicketList(sortedTicketArray)
  }



  useEffect(() => {
    ticketSorter(ticketList)
  }, [ticketList]);

  return (
    <Frame padding={4} className='planned category'>
    <Frame boxShadow="in" className='category__inner'>
    <header className='category__header'> <h3>{category.name}</h3> </header>
    <section className='category__list'>
    {localTicketList.map(ticket =>
        ( <TicketCard setTicketList={setTicketList} ticketList={ticketList} ticket={ticket} key={ticket.createdAt + ticket.title}/> ))}
    </section>
    </Frame>
  </Frame>
  )
}

export default CategoryCard;