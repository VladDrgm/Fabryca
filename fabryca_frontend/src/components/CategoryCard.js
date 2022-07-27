import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import TicketCard from './TicketCard';
import { Frame } from '@react95/core';
import { Progman46, Progman43 } from '@react95/icons';
import CursorButton from './CursorButton';

const CategoryCard = ({category, ticketList, setTicketList}) => {

  const [localTicketList, setLocalTicketList] = useState([]);

  const ticketSorter = data => {
    const sortedTicketArray = data.filter(ticket => ticket.categoryName === category.name)

    setLocalTicketList(sortedTicketArray)
  }

  useEffect(() => {
    ticketSorter(ticketList)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketList]);
  const [showCategory, setShowCategory] = useState(true);

  const toggleCategory = () => {
    setShowCategory(!showCategory);
  }

  const deleteCategory = async () => {

    const url = `https://fabrycaapi.azurewebsites.net/api/Categories/${localStorage.getItem('projectName')}/${category.name}`;
    
    const response = fetch(url,{
      method: 'DELETE',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    if ((await response).ok) {

      window.location.reload();
      // const newList = ticketList.filter( t => t.title != ticket.title);
      // console.log(newList);
      // setTicketList(newList)
    }
  };

  const arrowSymbol = showCategory === true ? <Progman46 variant="32x32_1" className='show__desc__arrow'/> : <Progman43 variant="32x32_1" className='show__desc__arrow'/>;
  
  return (
    <Frame padding={4} className='planned category'>
    <Frame boxShadow="in" className='category__inner'>
    <header className='category__header' onClick={toggleCategory}> 
      <h3>{category.name}({localTicketList.length}) </h3> 
      {arrowSymbol}
    </header>
    <section className={showCategory === true ? 'category__list--show' : 'category__list--hidden'}>
    {localTicketList.length !== 0 ? localTicketList.map(ticket =>
        ( <TicketCard setTicketList={setTicketList} ticketList={ticketList} ticket={ticket} key={ticket.createdAt + ticket.title}/> )) : <h4>There aren't any tickets for this category</h4>}
    </section>
        {showCategory === true ? <CursorButton type={'Pointer'} text={'Delete Category'} onClick={deleteCategory} /> : null}
    </Frame>
  </Frame>
  )
}

export default CategoryCard;