import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiHome, FiClipboard } from 'react-icons/fi'

import api from '../../services/api'

export default function Sidebar(){

  const [classrooms, setClassrooms] = useState([])

  const id = localStorage.getItem('id')

  useEffect(()=>{
    api.get('/', {
        headers: {
            Authorization: id, 
        }
    }).then(response => {
        setClassrooms(response.data);
    })
}, [id])


  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  return(
    <div id="mySidebar" className="sidebar">

      <div className="classContainer">
        <span><FiHome/></span>
        <p>Turmas</p>
        <button onClick={()=>closeNav()}>X</button>
      </div>

      <div className="sidebar_content">
        <p>Inscrito</p>

        <ul>
          {
            classrooms.map(classroom => {
              return(
                <li className="classroom" key={classroom.id}>
                  <div className="circle">
                    {classroom.name.trim().charAt(0)}
                  </div>
                  <div className="classroom_info">
                    <Link className="link" to="/classroom">
                      <p onClick={()=>{
                        localStorage.setItem('classroom_id', classroom.id)
                        localStorage.setItem('classroom_name', classroom.name)
                        localStorage.setItem('classroom_description', classroom.description)
                        localStorage.setItem('classroom_teacher', classroom.teacher)
                      }}>
                        {classroom.name}
                      </p>
                    </Link>
                    <span>{classroom.description}</span>
                  </div>
                </li>
              )
            })
          }

        </ul>
      </div>

    </div>
  )
}