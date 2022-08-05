import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import CategoryCard from './CategoryCard';


const Board2 = ({projectName}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  

  useEffect(() => {
    getTicketData();
    getCategoriesData().then((data) => {console.log(data);});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getTicketData();
      getCategoriesData();
    }, 2000);
    // eslint-disable-next-line
  }, [ticketList]);

  const getTicketData = async () => {
    const response = await fetch(`https://fabrycaapi.azurewebsites.net/api/Tickets/project/${projectName}`);
    const data = await response.json();
    setTicketList(data)

  }

  const getCategoriesData = async () => {
    const response = await fetch(`https://fabrycaapi.azurewebsites.net/api/Categories/${projectName}`);
    const data = await response.json();
    setCategoryList(data);
    return data;
  }
  
  return(
    <div className='board'>
      {categoryList.map(category =>
        ( <CategoryCard ticketList={ticketList} categoryList={categoryList} setTicketList={setTicketList} category={category} key={category.name}/> ))}
    </div>
  )
}

export default Board2;