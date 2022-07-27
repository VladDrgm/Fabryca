import React, { useState} from 'react';
import { Frame, Input } from '@react95/core'
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';
import CursorButton from './CursorButton';


 const TicketForm = () =>{
    const [name, setName] = useState('');

  
    const postToDatabase = async (newProject) => {

      const body = JSON.stringify(newProject);
      
      await fetch('https://fabrycaapi.azurewebsites.net/api/Projects',{
        method: 'POST',
        mode: 'cors',
        accept: 'text/plain',
        headers:{'Content-Type':'application/json'},
        body: body
      }).then(r=>r.json()).then(res=>{
        if(res){
          console.log(res);
        }
        navigate('/projects');
      });
  
    }
    const navigate = useNavigate();
    const handleSubmit = e => {
      e.preventDefault();
      const newProject={
        name: name
        }
        
      postToDatabase(newProject);
  
      setName('');
    }

    return(
      <Frame className='ticket__form__frame'>
        <form onSubmit={handleSubmit} className="ticket__form">
          <h3 className='ticket__form__title'>Add a New Project</h3>
          <Input type='text' placeholder='Title' value={name} className={'ticket__form__field'} onChange={e => setName(e.target.value)}/>
          <CursorButton type={'Pointer'} text={'Add a new project'} />
        </form>
      </Frame>
    )
  }

export default TicketForm;