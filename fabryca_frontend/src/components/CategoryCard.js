import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import TicketCard from './TicketCard';
import { Frame } from '@react95/core';
import { Progman46, Progman43 } from '@react95/icons';

const CategoryCard = ({category, ticketList, setTicketList}) => {

  const [localTicketList, setLocalTicketList] = useState([]);

  const ticketSorter = data => {
    const sortedTicketArray = data.filter(ticket => ticket.categoryName === category.name)

    setLocalTicketList(sortedTicketArray)
  }

  useEffect(() => {
    ticketSorter(ticketList)
  }, [ticketList]);
  const [showCategory, setShowCategory] = useState(false);
  const toggleCategory = () => {
    setShowCategory(!showCategory);
  }
  const arrowSymbol = showCategory === true ? <Progman46 variant="32x32_1" className='show__desc__arrow'/> : <Progman43 variant="32x32_1" className='show__desc__arrow'/>;
  
  return (
    <Frame padding={4} className='planned category'>
    <Frame boxShadow="in" className='category__inner'>
    <header className='category__header' onClick={toggleCategory}> <h3>{category.name} {arrowSymbol}</h3> </header>
    <section className={showCategory === true ? 'category__list--show' : 'category__list--hidden'}>
    {localTicketList.map(ticket =>
        ( <TicketCard setTicketList={setTicketList} ticketList={ticketList} ticket={ticket} key={ticket.createdAt + ticket.title}/> ))}
    </section>
    </Frame>
  </Frame>
  )
}

export default CategoryCard;