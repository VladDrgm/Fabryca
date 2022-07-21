import React, {useEffect, useState} from 'react';
import { Frame } from '@react95/core'
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';


 const TicketForm = () =>{
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
  
    const postToDatabase = (newTicket) => {

      const body = JSON.stringify(newTicket);

      fetch('https://localhost:7076/api/Tickets',{
        method: 'POST',
        mode: 'cors',
        headers:{'Content-Type':'application/json'},
        body: body
      }).then(r=>r.json()).then(res=>{
        if(res){
          console.log(res);
        }
      });
  
    }
    const handleSubmit = e => {
      e.preventDefault();
      const newTicket={
        Title: title,
        Status: status,
        Description: description,
        }
        
      postToDatabase(newTicket);
  
      setTitle('');
      setDescription('');
      setStatus('');
    }

    return(
      <Frame className='ticket__form__frame'>
        <form onSubmit={handleSubmit} className="ticket__form">
          <h3 className='ticket__form__title'>Add a New Ticket</h3>
          <input type='text' placeholder='Title' value={title} className={'ticket__form__field'} onChange={e => setTitle(e.target.value)}/>
          <input type='text'placeholder='Status' value={status} className={'ticket__form__field'} onChange={e => setStatus(e.target.value)}/>
          <input type='text'placeholder='Description' value={description} className={'ticket__form__field'} onChange={e => setDescription(e.target.value)}/>
          <button type='submit'> Add a new ticket </button> 
        </form>
      </Frame>
    )
  }

export default TicketForm;