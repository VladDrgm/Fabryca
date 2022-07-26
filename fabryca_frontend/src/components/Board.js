import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import CategoryCard from './CategoryCard';
import LoadingComponent from './LoadingComponent';


const Board = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  

  useEffect(() => {
    getTicketData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getTicketData();
    }, 2000);
  }, [ticketList]);
  
  const getTicketData = async () => {
    const response = await fetch('https://localhost:7076/api/Tickets/project/Fabryca');
    const data = await response.json();
    setTicketList(data)
  }


  const getCategoriesData = async () => {
    const response = await fetch('https://fabrycaapi.azurewebsites.net/api/Categories/name?Name=Fabryca');
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
     </div>
  )
}

export default Board;