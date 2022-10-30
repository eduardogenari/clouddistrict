import React, { useState, useEffect } from 'react'
import axios from "axios"

const baseUrl = "https://reqres.in/api/users/" 

export default function Dashboard(props){

    const [items, setItems] = useState([]);
    const [modalInsert, setModalInsert]=useState(false);
    const [modalEdit, setModalEdit]=useState(false);
    const [modalDelete, setModalDelete]=useState(false);
  
    const [selectedConsole, setSelectedConsole]=useState({
        id: null,
        first_name: '',
        last_name:''
    })
    
    const handleChange=e=>{
        const {name, value}=e.target;
        setSelectedConsole(prevState=>({
            ...prevState,
            [name]: value
        }))
        //console.log(selectedConsole);
    }
    
    useEffect(() => {
        axios.get(baseUrl).then(res => {
            setItems(res.data.data);
        });
    }, []);
    
    //console.log(items)
      
    const postPetition=async()=>{   
        //console.log(selectedConsole)
        selectedConsole.id = Math.floor(Math.random() * 1000);
        await axios.post(baseUrl, selectedConsole)
            .then(res=>{
                setItems(items.concat(res.data))
                console.log(items)
                openCloseModalInsert()
                cleanInput()
            })
    }
    
    const putPetition=async()=>{
        await axios.put(baseUrl, selectedConsole)
            .then(response=>{
                var newData=items;
                newData.map(console=>{
                if(selectedConsole.id===console.id){
                    console.first_name=selectedConsole.first_name;
                    console.last_name=selectedConsole.last_name;
                }
                })
                setItems(newData);
                openCloseModalEdit();
                cleanInput()
            })
    }

    const deletePetition=async()=>{
        await axios.delete(baseUrl+selectedConsole.id)
            .then(response=>{
                setItems(items.filter(console=>console.id!==selectedConsole.id));
                openCloseModalDelete();
                cleanInput()
            })
    }

    const openCloseModalInsert=()=>{
        setModalInsert(!modalInsert);
    }

    const openCloseModalEdit=()=>{
        setModalEdit(!modalEdit);
    }

    const openCloseModalDelete=()=>{
        setModalDelete(!modalDelete);
    }
    
    const selectConsole=(console, caso)=>{
        setSelectedConsole(console);
        (caso==='Editar')?openCloseModalEdit():openCloseModalDelete()
    }

    const cleanInput=()=>{
        setSelectedConsole({
            id: null,
            first_name: '',
            last_name:''
        })
    }

    const bodyInsert=(
        <div className='modal'>
            <div className='list-name'>
                <input name="first_name"  label="Name" placeholder="First Name" onChange={handleChange}></input>
                <input name="last_name"  label="Surname" placeholder="Last Name" onChange={handleChange}></input>
            </div>
            <button className="btn" onClick={()=>postPetition()}>OK</button>
            <button className="btn" onClick={()=>openCloseModalInsert()}>CANCEL</button>
        </div>
    )

    const bodyEdit=(
        <div className='modal'>
            <div className='list-name'>
                <input name="first_name"  label="Name" onChange={handleChange} value={selectedConsole && selectedConsole.first_name}></input>
                <input name="last_name"  label="Surname" onChange={handleChange} value={selectedConsole && selectedConsole.last_name}></input>
            </div>
            <button className="btn" onClick={()=>putPetition()}>OK</button>
            <button className="btn" onClick={()=>openCloseModalEdit()}>CANCEL</button>
        </div>
    )

    const bodyDelete=(
        <div className='modal'>
            <div className='list-name'>
                <p>Delete <b>{selectedConsole && selectedConsole.first_name} {selectedConsole && selectedConsole.last_name}</b> ?</p>
            </div>
            <button className="btn" onClick={()=>deletePetition()}>YES</button>
            <button className="btn" onClick={()=>openCloseModalDelete()}>NO</button>
        </div>
    )
  
    if (!items) return null;

    return (
        <div className="dash-container">
            <div className="dash-header">
                <h2>hi <span>{props.user}</span>! this is your dashboard</h2>
            </div>
            <div className="list">
                {items.map(console=>(
                    <div className="list-item" key={console.id}>
                        <div className="list-name">
                            <p>{console.first_name} {console.last_name}</p>
                        </div>
                        <button className="btn" onClick={()=>selectConsole(console, 'Editar')}>EDIT</button>
                        <button className="btn" onClick={()=>selectConsole(console, 'Eliminar')}>DEL</button>
                    </div> 
                ))}
            </div >
            <div className='list-item'>
                <div className="list-name"></div>
                <button className="btn btn-new" onClick={()=>openCloseModalInsert()}>NEW</button>
            </div>

            <div> {(modalInsert && bodyInsert)} </div>
            <div> {(modalEdit && bodyEdit)} </div>
            <div> {(modalDelete && bodyDelete)} </div>

        </div>
    )
}