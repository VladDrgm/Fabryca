import React, { useState} from 'react';
import './TicketCard.css';
import './Board.css';
import { Link, useNavigate } from 'react-router-dom';
import '@react95/icons/icons.css';
import { Progman46, Progman43 } from '@react95/icons'
import CursorButton from './CursorButton';

const TicketCard = ({ticket, ticketList, setTicketList}) => {
  const projName = localStorage.getItem('projectName');

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

  const makeOngoing = () => {
    const url = `https://fabrycaapi.azurewebsites.net/api/Tickets/${projName}/${ticket.title}/category?categoryName=Ongoing`;
    
    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
          }
    )
    updateState('Ongoing');

  };

  const makePlanned = () => {
     const url = `https://fabrycaapi.azurewebsites.net/api/Tickets/${projName}/${ticket.title}/category?categoryName=Planned`;

    fetch(url,{
      method: 'PUT',
      mode: 'cors',
      headers:{'Content-type':'application/json'}
      }
    )
    updateState('Planned');
  };

  const makeCompleted = () => {
    const url = `https://fabrycaapi.azurewebsites.net/api/Tickets/${projName}/${ticket.title}/category?categoryName=Completed`;

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
          <CursorButton type={'Pointer'} text={'Delete'} onClick={handleDelete}/>
          {ticket.categoryName === 'Planned' ? <CursorButton type={'Pointer'} text={'Ongoing'} onClick={handleMakeOngoing} /> : null}
          {ticket.categoryName === 'Ongoing' ? 
            <div>
              <CursorButton type={'Pointer'} text={'Planned'} onClick={handleMakePlanned} />
              <CursorButton type={'Pointer'} text={'Completed'} onClick={handleMakeCompleted} /> 
            </div>
          : null} 
          {ticket.categoryName === 'Completed' ? <CursorButton type={'Pointer'} text={'Ongoing'} onClick={handleMakeOngoing} /> : null}
        </div>
      </section>

  </article>
  )
}

export default TicketCard;
