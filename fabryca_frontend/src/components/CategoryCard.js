import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import TicketCard from './TicketCard';


const CategoryCard = ({category}) => {

  const [ticketList, setTicketList] = useState([]);

  const ticketSorter = data => {
    const sortedTicketArray = data.filter(ticket => ticket.categoryName === category.name)

    setTicketList(sortedTicketArray)
  }

  const getTicketData = async () => {
    const response = await fetch('https://localhost:7076/api/Tickets/');
    const data = await response.json();
    ticketSorter(data)
  }
  useEffect(() => {
    getTicketData()
    console.log(ticketList)
  }, []);

  return (
    <Frame padding={4} className='planned category'>
    <Frame boxShadow="in" className='category__inner'>
    <header className='category__header'> <h3>{category.name}</h3> </header>
    <section className='category__list'>
    {ticketList.map(ticket =>
        ( <TicketCard ticket={ticket} key={ticket.createdAt + ticket.title}/> ))}
    </section>
    </Frame>
  </Frame>
  )
}

export default CategoryCard;