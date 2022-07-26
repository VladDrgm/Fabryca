import React, { useState } from 'react';
import { Frame, Input } from '@react95/core';
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';
import CursorButton from './CursorButton';


 const CategoryForm = () =>{
    const [name, setName] = useState('');
    const projName = localStorage.getItem('projectName');
  
    const postToDatabase = async () => {
      // https://fabrycaapi.azurewebsites.net
      await fetch(`https://localhost:7076/api/Categories/${projName}/${name}`,{
        method: 'POST',
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
      
      postToDatabase();
      
      setName('');
      navigate(-1);
    }
    
    return(
      <Frame className='ticket__form__frame'>
        <form onSubmit={handleSubmit} className="ticket__form">
          <h3 className='ticket__form__title'>Add a New Category to: {projName}</h3>
          <Input type='text' placeholder='Title' value={name} className={'ticket__form__field'} onChange={e => setName(e.target.value)}/>
          <CursorButton type={'Pointer'} text={'Add Category'} />
        </form>
      </Frame>
    )
  }

export default CategoryForm;