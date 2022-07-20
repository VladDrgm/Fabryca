import React, {useEffect, useState} from 'react';
import '../App.css';

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
      <form onSubmit={handleSubmit} >
        <input type='text' placeholder='Title' value={title} className={'titleToAdd'} onChange={e => setTitle(e.target.value)}/>
        <input type='text'placeholder='Status' value={status} className={'descriptionToAdd'} onChange={e => setStatus(e.target.value)}/>
        <input type='text'placeholder='Description' value={description} className={'descriptionToAdd'} onChange={e => setDescription(e.target.value)}/>
        <button type='submit'> Add a new ticket </button> 
      </form>
    )
  }

export default TicketForm;