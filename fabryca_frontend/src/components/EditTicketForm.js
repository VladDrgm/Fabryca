import React, { useState } from 'react';
import { Frame, Input } from '@react95/core';
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';
import CursorButton from './CursorButton';


 const EditTicketForm = () =>{
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const oldTicketName = localStorage.getItem('name');
    const projName = localStorage.getItem('projectName');
  
    const putToDatabase = async () => {

      await fetch(`https://fabrycaapi.azurewebsites.net/api/Tickets/${oldTicketName}/${projName}/ticket?newTitle=${title}&newStatus=${status}&newCategoryName=${category}&newDescription=${description}`,{
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
          <CursorButton type={'Pointer'} text={'Update ticket'} />
        </form>
      </Frame>
    )
  }

export default EditTicketForm;