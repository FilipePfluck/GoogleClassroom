import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import LogoImg from '../../assets/logo.png'
import { FiMenu, FiPlus, FiMoreVertical, FiHome, FiClipboard } from 'react-icons/fi'

import './styles.css'
import '../../global.css'

import Siderbar from '../sidebar/index'

import api from '../../services/api'

export default function Classrooms(){

  //Funções de estilização 

  function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
  }

  function changeOpacity(){
    document.getElementById('main').className = "darkClassroomsContainer"
    document.getElementById('mySidebar').className = "darkSidebar"
  }

  function addClassroom(){
    document.getElementById("add_classroom").className ="add_classroom"
    changeOpacity()
  }

  function closeAddClassroom(){
    document.getElementById("add_classroom").className ="invisible"

    document.getElementById('main').className = "classroomsContainer"
    document.getElementById('mySidebar').className = "sidebar"
  }

  function changeColor(){
    var inputClassName = document.getElementById('add_classroom_input').className

    if(inputClassName === "add_classroom_input"){
      document.getElementById('add_classroom_input').className = "add_classroom_input_blue"
    }

    else{
      document.getElementById('add_classroom_input').className = "add_classroom_input"
    }
    
  }

  //React

  const [classrooms, setClassrooms] = useState([])
  const [classroom_id, setClassroomId] = useState('')

    const history = useHistory();

    const name = localStorage.getItem('name')
    const id = localStorage.getItem('id')

    useEffect(()=>{
        api.get('/', {
            headers: {
                Authorization: id, 
            }
        }).then(response => {
            setClassrooms(response.data)
        })
    }, [id]);

    async function handleAddClassroom(e){
      e.preventDefault();
        
        try{

            await api.post('/classrooms', 
            { classroom_id }, 
            { headers: {
              Authorization: id
            }})

            

        }catch (err) {
            alert('Erro ao entrar na sala de aula.')
        }
    }

    function handleLogout(){
      localStorage.clear();

      history.push('/');
    }

  return (
  <>
    <Siderbar/>

    <div className="classroomsContainer" id="main">

      <header>
        <section>
            <button onClick={()=>openNav()}>
              <FiMenu size={18} color="#5F6368"/>
            </button>
        
            <img className="logoHeader" src={LogoImg} alt="Google"/>

            <p>Sala de Aula</p>
        </section>
        
        <section className="headerRight">
          <button onClick={()=>addClassroom()}>
            <FiPlus size={24}/>
          </button>

          <div className="circle" onClick={()=>handleLogout()}>
            {name.trim().charAt(0)}
          </div>
        </section>
      </header>

      <ul>

        {classrooms.map(classroom=>{
          if(!classroom){
            return(
              <div className="empty_classroom_list">
                <p>Você não está em nenhuma sala de aula. Pressione o ícone de + no topo da página e insira o código de uma turma</p>
              </div>
            )
          }

          console.log(classroom)
          return(
          <li className="classroom_card" key={classroom.id}>

            <div className="card_header" >
              <div className="title_container">
                <Link className="link" to="/classroom">
                  <h1 onClick={()=>{
                    localStorage.setItem('classroom_id', classroom.id)
                    localStorage.setItem('classroom_name', classroom.name)
                    localStorage.setItem('classroom_description', classroom.description)
                    localStorage.setItem('classroom_teacher', classroom.teacher)
                  }}>{classroom.name}</h1>
                </Link>
                  <p>{classroom.description}</p>
              </div>
              <p>{classroom.teacher}</p>
            </div>

            <button>
              <FiMoreVertical size={18} color="#fff"/>
            </button>

            <div className="big_circle_container">
              <div></div>
              <div className="big_circle">{classroom.teacher.trim().charAt(0)}</div>
            </div>

          </li>
        )})} 

      </ul>


    </div>

    <div id="add_classroom" className="invisible">
      <div className="add_classroom_title">
        <p>Participar da turma</p>

        <button onClick={()=>closeAddClassroom()}>
          x
        </button>
      </div>

      <p>Peça para seu professor o código da turma e digite-o aqui.</p>

      <form onSubmit = { handleAddClassroom }>
        <input 
          id="add_classroom_input" 
          type="text" 
          className="add_classroom_input" 
          onClick={()=>changeColor()}
          onBlur={()=>changeColor()}
          placeholder="Código da turma"

          value = {classroom_id}
          onChange = {e => setClassroomId(e.target.value)}
        />

        <div className="button_container">

            <button>
              <p >Participar</p>
            </button>

        </div>
      </form>
        
    </div>
  </>
  )
}