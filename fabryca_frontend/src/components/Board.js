import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import { Frame } from '@react95/core'
import CategoryCard from './CategoryCard';


const Board = () => {
  return(
    
    <div className='board'>
      <CategoryCard category={'planned'}/>
      <CategoryCard category={'ongoing'}/>
      <CategoryCard category={'completed'}/>
    </div>
  )
}

export default Board;