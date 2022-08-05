import React, { useState} from 'react';
import './TicketCard.css';
import './Board.css';
import { Link, useNavigate } from 'react-router-dom';
import '@react95/icons/icons.css';
import { Progman46, Progman43 } from '@react95/icons'
import CursorButton from './CursorButton';

const TicketCard = ({ticket, ticketList, setTicketList, category, categoryList}) => {
  const projName = localStorage.getItem('projectName');
  const categoryIndex = categoryList.indexOf(category);
  const categoryListLength = categoryList.length;

  const deleteToDatabase = async () => {
    const url = 'https://fabrycaapi.azurewebsites.net/api/Tickets/' + ticket.title
    
    const response = fetch(url,{
      method: 'DELETE',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    if ((await response).ok) {
      const newList = ticketList.filter( t => t.title !== ticket.title);
      console.log(newList);
      setTicketList(newList)
    }
  };
  
  const makeNextCategory = () => {
    const nextCategory = categoryList[categoryIndex + 1].name
    const url = `https://fabrycaapi.azurewebsites.net/api/Tickets/${projName}/${ticket.title}/category?categoryName=${nextCategory}`;
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState(nextCategory)
  }

  const makePrevCategory = () => {
    const prevCategory = categoryList[categoryIndex - 1].name
    const url = `https://fabrycaapi.azurewebsites.net/api/Tickets/${projName}/${ticket.title}/category?categoryName=${prevCategory}`;
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState(prevCategory)
  }

  const updateState = (newCategory) => {
    console.log(ticketList)
    const updatedList = ticketList.map(
      el => el.title === ticket.title ? { ...el, categoryName: newCategory } : el
    )
    setTicketList(updatedList);
  }

  const handleNextCategory = (e) => {
    e.preventDefault();
    makeNextCategory();
  }

  const handlePrevCategory = (e) => {
    e.preventDefault();
    makePrevCategory();
  }


  const handleDelete = (e) => {
    e.preventDefault();
    deleteToDatabase();
  }

  const navigate = useNavigate();
  const saveNameAndNavigate = (e) => {
    e.preventDefault();
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
        <Link to={{pathname: `/edit`, state: [{ticketName: ticket.name}]}} className='ticket__card--edit' onClick={saveNameAndNavigate}>
          <CursorButton type={'Pointer'} text={'Edit'} />
        </Link>
        <h4 className='ticket__label'>Title:</h4>
        <h3 className='ticket__title'>{ticket.title}</h3>
        <p className='ticket__status'>({ticket.status})</p>
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
            <p className='ticket__assigned'>{ticket.assignedTo}</p>
          </div>
        </div>
        <hr className='ticket__hr'/>
        <div className='ticket__buttons'>
          <CursorButton type={'Pointer'} text={'Delete'} onClick={handleDelete}/>
          <div>
          {categoryIndex > 0 ? <CursorButton type={'Pointer'} text={categoryList[categoryIndex + -1].name} onClick={handlePrevCategory} /> : null}
          {categoryIndex < categoryListLength - 1 ? <CursorButton type={'Pointer'} text={categoryList[categoryIndex + 1].name} onClick={handleNextCategory} /> : null}
          </div>
        </div>
      </section>

  </article>
  )
}

export default TicketCard;
