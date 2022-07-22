import React, { useState } from 'react';
import { Frame, Input, Button, Cursor } from '@react95/core';
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';


 const EditTicketForm = () =>{
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const oldTicketName = localStorage.getItem('name');
  
    const putToDatabase = async () => {

      await fetch(`https://localhost:7076/api/Tickets/${oldTicketName}/ticket?newTitle=${title}&newStatus=${status}&newCategoryName=${category}&newDescription=${description}`,{
        method: 'PUT',
        mode: 'cors',
        headers:{'Content-Type':'application/json'}
      }).then(r=>r.json()).then(res=>{
        if(res){
          console.log(res);
        }
      });
      localStorage.clear();
  
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
        
      putToDatabase();
  
      setTitle('');
      setDescription('');
      setStatus('');
      setCategory('');
      navigate('/home');
    }

    return(
      <Frame className='ticket__form__frame'>
        <form onSubmit={handleSubmit} className="ticket__form">
          <h3 className='ticket__form__title'>Edit Ticket: {oldTicketName}</h3>
          <Input type='text' placeholder='Title' value={title} className={'ticket__form__field'} onChange={e => setTitle(e.target.value)}/>
          <Input type='text' placeholder='Status' value={status} className={'ticket__form__field'} onChange={e => setStatus(e.target.value)}/>
          <Input type='text' placeholder='Description' value={description} className={'ticket__form__field'} onChange={e => setDescription(e.target.value)}/>
          <Input type='text' placeholder='Category' value={category} className={'ticket__form__field'} onChange={e => setCategory(e.target.value)}/>
          <Button type='submit' style={{cursor:'pointer'}}> Confirm Edit </Button> 
        </form>
      </Frame>
    )
  }

export default EditTicketForm;