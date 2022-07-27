import React, { useState} from 'react';
import { Frame, Input, TextArea } from '@react95/core'
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';
import CursorButton from './CursorButton';


 const TicketForm = () =>{
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const projName = localStorage.getItem('projectName');

  
    const postToDatabase = async (newTicket) => {

      const body = JSON.stringify(newTicket);

      const actualLink = 'https://fabrycaapi.azurewebsites.net/api/Tickets';
      // const localLink = 'https://localhost:7076/api/Tickets'; //to be removed
      await fetch(actualLink,{
        method: 'POST',
        mode: 'cors',
        accept: 'text/plain',
        headers:{'Content-Type':'application/json'},
        body: body
      }).then(r=>r.json()).then(res=>{
        if(res){
          console.log(res);
        }
      });
  
    }
    const navigate = useNavigate();
    const handleSubmit = e => {
      e.preventDefault();
      const newTicket={
        Title: title,
        Status: status,
        Description: description,
        ProjectName: projName,
        createdBy: createdBy,
        assignedTo: assignedTo
        }
        
      postToDatabase(newTicket);

      navigate(-1);
  
      setTitle('');
      setDescription('');
      setStatus('');
    }

    return(
      <Frame className='ticket__form__frame'>
        <form onSubmit={handleSubmit} className="ticket__form">
          <h3 className='ticket__form__title'>Add a New Ticket to: {projName}</h3>
          <Input type='text' placeholder='Title' value={title} className={'ticket__form__field'} onChange={e => setTitle(e.target.value)}/>
          <Input type='text'placeholder='Status' value={status} className={'ticket__form__field'} onChange={e => setStatus(e.target.value)}/>
          {/* <Input type='text'placeholder='Description' value={description} className={'ticket__form__field'} onChange={e => setDescription(e.target.value)}/> */}
          <TextArea rows={5} placeholder='Description' value={description} className={'ticket__form__field'} onChange={e => setDescription(e.target.value)} />
          <Input type='text'placeholder='Created By' value={createdBy} className={'ticket__form__field'} onChange={e => setCreatedBy(e.target.value)}/>
          <Input type='text'placeholder='Assigned To' value={assignedTo} className={'ticket__form__field'} onChange={e => setAssignedTo(e.target.value)}/>
          <CursorButton type={'Pointer'} text={'Add a new ticket'} />
        </form>
      </Frame>
    )
  }

export default TicketForm;