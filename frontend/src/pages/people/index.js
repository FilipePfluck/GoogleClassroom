import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiMenu, FiHome, FiClipboard, FiMail } from 'react-icons/fi'

import api from '../../services/api'

import Siderbar from '../sidebar/index'

import './styles.css'
import '../../global.css'

export default function People() {
  function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
  }

  //React

  const classroom_name = localStorage.getItem('classroom_name')
  const classroom_description = localStorage.getItem('classroom_description')
  const name = localStorage.getItem('name')
  const classroom_id = localStorage.getItem('classroom_id')
  const id = localStorage.getItem('id')
  const teacher = localStorage.getItem('classroom_teacher')

  const [students, setStudents] = useState([])

  const history = useHistory()

  useEffect(()=>{
    api.get('/classroom/people', {
      headers: {
        Authorization: classroom_id
      }
    }).then(response=>{
      setStudents(response.data)
    })
  },[students, classroom_id])

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return(
    <>
    <Siderbar/>
      
    <header className="classroom_header">
        <section>
            <button >
              <FiMenu size={18} color="#5F6368" onClick={()=>openNav()}/>
            </button>
            <div>
              <Link className="link" to="/classroom">
                <p>{classroom_name}</p>
              </Link>
              <span>{classroom_description}</span>
            </div>
            
        </section>
        
        <div className="navigation">
          <Link className="link" to="/classroom">
            <button id="mural">
              <p>Mural</p> 
            </button>
          </Link>
          <button id="pessoas" className = "button_pressed">
            <p>Pessoas</p> 
          </button>
        </div>

        <div className="circle" onClick={()=> handleLogout()}>
          {name.trim().charAt(0)}
        </div>

    </header>

    <div className="content">
      <div className="teachers">
        <div className="title">
          <h1>Professores</h1>
        </div>
        <ul>
          <li>
            <div>
              <div className="circle">J</div>
              <p>{teacher}</p>
            </div>
            <FiMail size={20} color={'#5F6368'}></FiMail>
          </li>
        </ul>
      </div>

      <div className="students">
        <div className="title">
          <h1>Alunos</h1>
        </div>
        <ul>
          {
            students.map(student => {
              if(student.id !== id){
                return(
                  <li key={student.id}>
                    <div>
                      <div className="circle">{student.name.trim().charAt(0)}</div>
                      <p>{student.name}</p>
                    </div>
                    <FiMail size={20} color={'#5F6368'}></FiMail>
                  </li>
                )
              }
              
              
            })
          }

          
        </ul>
      </div>
    </div>

    </>
  )
}