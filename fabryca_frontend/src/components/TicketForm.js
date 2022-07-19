import React, {useEffect, useState} from 'react';
import '../App.css';

const TicketForm = ({ticketList, setTicketList}) =>{
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const postToDatabase = (newTicket) => {
    const newnewTicket={Title: newTicket.title,
      Description: newTicket.description,
      Category: newTicket.category,
      Status: 'not done',
      CreatedAt: '2022-07-08T00:00:00'
      }
    const body = JSON.stringify(newnewTicket)

    console.log('this is the body', body)

    fetch('https://localhost:7076/api/FabrykaDb',{
      method: 'POST',
      mode: 'cors',
      headers:{'Content-type':'application/json'},
        body: body
    }).then(r=>r.json()).then(res=>{
      if(res){
        console.log('sent');
      }
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newTicket={title: title,
      description: description,
      status: 'not done',
      createdAt: '12-21-16',
      categoryId: 1,
      }
    console.log("old list ", ticketList);
    setTicketList([...ticketList,
      newTicket
    ])
    postToDatabase(newTicket);
    console.log("new list ", ticketList);

    setTitle('');
    setDescription('');
}
  return(
  <form onSubmit={handleSubmit} >
  <input type='text' placeholder='Title' value={title} className={'titleToAdd'} onChange={e => setTitle(e.target.value)}/>
  <input type='text'placeholder='Description' value={description} className={'descriptionToAdd'} onChange={e => setDescription(e.target.value)}/>
  <button type='submit'> Add a new ticket </button> 
  </form>
  )
}

export default TicketForm;