import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import { Frame } from '@react95/core'


const Board = () => {
  return(
    
    <div className='board'>

      <Frame padding={4} className='planned category'>
        <Frame boxShadow="in" className='category__inner'>
        <header className='category__header'> <h3>Planned</h3> </header>
        <section className='category__list'>
        <article className='ticket'>
          <p>ticket1</p>
        </article>
        <article className='ticket'>
        <p>ticket2</p>
        </article>
        </section>
        </Frame>
      </Frame>
      
      <Frame padding={4} className='planned category'>
        <Frame boxShadow="in" className='category__inner'>
        <header className='category__header'> <h3>Ongoing</h3> </header>
        <section className='category__list'>
        <article className='ticket'>
          <p>ticket1</p>
        </article>
        <article className='ticket'>
        <p>ticket2</p>
        </article>
        </section>
        </Frame>
      </Frame>

      <Frame padding={4} className='planned category'>
        <Frame boxShadow="in" className='category__inner'>
        <header className='category__header'> <h3>Completed</h3> </header>
        <section className='category__list'>
        <article className='ticket'>
          <p>ticket1</p>
        </article>
        <article className='ticket'>
        <p>ticket2</p>
        </article>
        </section>
        </Frame>
      </Frame>
    </div>
  )
}

export default Board;