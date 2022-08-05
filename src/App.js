import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from "react-dom"

function App() {
  const [count, setCount] = useState(0)
  const [fruit, setFruit] = useState(0)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  
  const getRequest = {
    method: 'GET'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log({name: firstName})

    const post = await (fetch('http://localhost:5000/api/name/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name: firstName})
      }))

      event.preventDefault()
      
      const response=await (fetch('http://localhost:5000/api/getter/', getRequest)
    .then(response=>response.json())
    .then(data=>setLastName(data.data_from_backend)))   
  }
  
  return (
    

    <div className="App">

      <div className='float-container'>
        
        <div className='float-child'>
          <form onSubmit={handleSubmit}>
            <p>Your Input Request to Server</p>
            <input type={"text"} value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            <input type={"submit"}></input>
          </form>
        </div>

        <div className='float-child'>
          <p>Response From Server</p>
          <input type="text" value={lastName}></input>
        </div>
      </div>

        

    </div>
  );
}

export default App;
