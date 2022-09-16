import React, { useState,useEffect } from 'react';
import Axios from "axios";
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [data,setData]= useState([]);
  const [newName, setNewName] = useState('');
  // console.log(newName);

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      // console.log(response)
      setData(response.data)
    })
  },[])
  const submitData =()=>{
    Axios.post("http://localhost:3001/insert",{
      name:name,
      number:number,
    })
  }
  const handledelete =(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  };
  const updateForm = (id)=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
     newName:newName,
      });
  }
  
    return (
    <div className="App">
      <h1>Form</h1>
      <label>Name</label>
      <input type="text" placeholder="Name...." onChange={(e)=>setName(e.target.value)}/>
      <label>number</label>
      <input type="text" placeholder="number...." onChange={(e)=>setNumber(e.target.value)}/>
      <button onClick={submitData}>Submit</button>
        {data.map((val,key)=>{
          return(
            <div style={{border:"1px solid black"}}>
            <h1>{val.name}</h1>
            <h1>{val.number}</h1>
            <input type="text" placeholder='Update..' onChange={(e)=>{
              setNewName(e.target.value);
            }}/>
            <button onClick={()=>updateForm(val._id)}>update</button>
            <button onClick={()=>handledelete(val._id)}>delete</button>


            </div>
          )
        })}
    </div>
  );
}

export default App;
