import React from 'react'; 
import {useState, useEffect } from 'react';
import './Board.css'
import { Frame } from '@react95/core'


const CategoryCard = ({category}) => {
  return (
    <Frame padding={4} className='planned category'>
    <Frame boxShadow="in" className='category__inner'>
    <header className='category__header'> <h3>{category}</h3> </header>
    <section className='category__list'>
      <article className='ticket'>
        <header className='ticket__header'>
          <h3>ticket title</h3>
          <div> </div>
        </header>
        <section className='ticket__body'>
        <p>ticket1 description</p>
        <p>2022-07-19T00:00:00</p>
        </section>
      </article>
      <article className='ticket'>
        <header className='ticket__header'>
          <h3>ticket title</h3>
          <div> </div>
        </header>
        <section className='ticket__body'>
        <p>ticket1 description</p>
        <p>2022-07-19T00:00:00</p>
        </section>
      </article>
    </section>
    </Frame>
  </Frame>
  )
}

export default CategoryCard;