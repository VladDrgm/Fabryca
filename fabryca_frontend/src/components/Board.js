import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import { Frame } from '@react95/core'
import CategoryCard from './CategoryCard';
import LoadingComponent from './LoadingComponent';


const Board = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  

  useEffect(() => {
    getTicketData();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getTicketData();
  //   }, 2000);
  // }, [ticketList]);

  const fakeTickets = [{title: 'Fix React useEffect', 
                    description: 'The useEffect in TicketPage needs to be fixed to avoid infinite loop.',
                    status: 'Urgent',
                    createdAt: '19680327-1111 Sunday',
                    categoryId: 1, 
                    categoryName: 'Planned'}, 
                    {title: 'Consectetur an di amadan', 
                    description: 'This is a description, this is a description,This is a description, this is a description',
                    status: 'This is a status',
                    createdAt: 'Monday 1234-32-53',
                    categoryId: 1, 
                    categoryName: 'Ongoing'},
                    {title: 'Dolor sit amet', 
                    description: 'This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description,This is a description, this is a description,This is a description, this is a description,This is a description, this is a description,This is a description, this is a description',
                    status: 'This is a status',
                    createdAt: '1997-11-13 Saturday',
                    categoryId: 1, 
                    categoryName: 'Completed'}]

  const fakeCategories = [{id: 1, name: 'Planned'}, {id: 2, name: 'Ongoing'}, {id: 3, name: 'Completed'}]

  const getTicketData = async () => {
    const response = await fetch('https://localhost:7076/api/Tickets/');
    const data = await response.json();
    setTicketList(data)
  }


  const getCategoriesData = async () => {
    const response = await fetch('https://localhost:7076/api/Categories/name?Name=Fabryca');
    const data = await response.json();
    setCategoryList(data)
  }

  useEffect(() => {
    getCategoriesData()
    console.log(categoryList)
  }, []);
  
  return(
    <div className='board'>
      <LoadingComponent />
      {categoryList.map(category =>
        ( <CategoryCard ticketList={ticketList} setTicketList={setTicketList} category={category} key={category.name}/> ))}
        {/* {fakeCategories.map(category =>
        ( <CategoryCard ticketList={fakeTickets} setTicketList={setTicketList} category={category} key={category.name}/> ))} */}
    </div>
  )
}

export default Board;