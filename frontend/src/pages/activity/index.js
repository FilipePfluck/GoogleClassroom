import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiMenu, FiHome, FiClipboard } from 'react-icons/fi'

import './styles.css'
import '../../global.css'

import Sidebar from '../sidebar/index'

import api from '../../services/api'

export default function Classroom(){
  function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }
  

  //React

  const classroom_id = localStorage.getItem('classroom_id')
  const classroom_name = localStorage.getItem('classroom_name')
  const classroom_description = localStorage.getItem('classroom_description')
  const teacher = localStorage.getItem('classroom_teacher')
  const name = localStorage.getItem('name')
  const activity_title = localStorage.getItem('title')
  const deadline_day =  localStorage.getItem('deadline_day')
  const deadline_month =  localStorage.getItem('deadline_month')
  const day =  localStorage.getItem('day')
  const month =  localStorage.getItem('month')
  const body =  localStorage.getItem('body')

  const history = useHistory()

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return(
    <>
    
    <Sidebar/>
      
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

        <div className="circle" onClick={()=> handleLogout()}>
          {name.trim().charAt(0)}
        </div>

      </header>

    <div className="content">

        <div className="activity_header_">
          <span>Data de entrega: {deadline_day}/{deadline_month}</span>
          <h1>{activity_title}</h1>
          <div className="activity_info">
            <div className="circle">
              J
            </div>
            <p>{teacher}</p>
            <span>{day}/{month}</span>
          </div>
        </div>

        <div className="activity_body">
          {body}
        </div>
      </div>

    </>
  )
}