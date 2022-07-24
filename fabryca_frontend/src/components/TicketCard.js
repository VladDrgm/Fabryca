import React, {useEffect, useState, useContext} from 'react';
import './TicketCard.css';
import './Board.css';
import { Button } from '@react95/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '@react95/icons/icons.css';
import { Progman46, Progman43 } from '@react95/icons'

const TicketCard = ({ticket, ticketList, setTicketList}) => {

  const deleteToDatabase = async () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title
    
    const response = fetch(url,{
      method: 'DELETE',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    if ((await response).ok) {
      const newList = ticketList.filter( t => t.title != ticket.title);
      console.log(newList);
      setTicketList(newList)
    }
  };

  const makeOngoing = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Ongoing'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
          }
    )
    updateState('Ongoing');

  };

  const makePlanned = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Planned'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState('Planned');
  };

  const makeCompleted = () => {
    const url = 'https://localhost:7076/api/Tickets/' + ticket.title + '/category?categoryName=Completed'
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState('Completed');
  };

  const updateState = (newCategory) => {
    console.log(ticketList)
    const updatedList = ticketList.map(
      el => el.title === ticket.title ? { ...el, categoryName: newCategory } : el
    )
    setTicketList(updatedList);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteToDatabase();
  }

  const handleMakeOngoing = (e) => {
    e.preventDefault();
    makeOngoing();
  }

  const handleMakePlanned = (e) => {
    e.preventDefault();
    makePlanned();
  }

  const handleMakeCompleted = (e) => {
    e.preventDefault();
    makeCompleted();
  }
  const navigate = useNavigate();
  const saveNameAndNavigate = (e) => {
    e.preventDefault();
    localStorage.clear();
    localStorage.setItem('name', ticket.title);
    navigate('/edit');
  }
  const [showDesc, setShowDesc] = useState(false);
  const toggleDesc = () => {
    setShowDesc(!showDesc);
  }
  const descSymbol = showDesc === true ? <Progman46 variant="32x32_1" className='show__desc__arrow'/> : <Progman43 variant="32x32_1" className='show__desc__arrow'/>;
  return(
    <article className='ticket__card'>

      <header className='ticket__header'>
        <Button className='ticket__card--edit'><Link to={{pathname: `/edit`, state: [{ticketName: ticket.name}]}} onClick={saveNameAndNavigate}>Edit</Link></Button>
        <h4 className='ticket__label'>Title:</h4>
        <h3>{ticket.title}</h3>
        <p>({ticket.status})</p>
      </header>
      <section className='ticket__body'>
        <h4 className='ticket__label' onClick={toggleDesc}>Description {descSymbol}</h4>
        
        <p className={showDesc === true ? 'ticket__description--show' : 'ticket__description--hidden'}>{ticket.description}</p>
        <div className='created__assigned'>
          <div className='lilbox'>
            <h4 className='ticket__label'>Created At/By:</h4>
            <p className='ticket__date'>{ticket.createdAt} by {ticket.createdBy}</p>
          </div>
          <div className='lilbox'>
            <h4 className='ticket__label'>Assigned To:</h4>
            <p>{ticket.assignedTo}</p>
          </div>
        </div>
        <hr className='ticket__hr'/>
        <div className='ticket__buttons'>
          <Button onClick={handleDelete}>Delete</Button>
          {ticket.categoryName === 'Planned' ? <Button onClick={handleMakeOngoing}>Ongoing</Button> : null}
          {ticket.categoryName === 'Ongoing' ? 
            <div>
              <Button onClick={handleMakePlanned}>Planned</Button>
              <Button onClick={handleMakeCompleted}>Completed</Button> 
            </div>
          : null} 
          {ticket.categoryName === 'Completed' ? <Button onClick={handleMakeOngoing}>Ongoing</Button> : null}
        </div>
      </section>

  </article>
  )
}

export default TicketCard;
