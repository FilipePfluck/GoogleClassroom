import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiMenu, FiHome, FiClipboard } from 'react-icons/fi'

import './styles.css'
import '../../global.css'

import api from '../../services/api'

import Siderbar from '../sidebar/index'

export default function Classroom(){
  function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
  }
  

  //React

  const classroom_id = localStorage.getItem('classroom_id')
  const classroom_name = localStorage.getItem('classroom_name')
  const classroom_description = localStorage.getItem('classroom_description')
  const name = localStorage.getItem('name')

  const [activities, setActivities] = useState([])
  const [comments, setComments] = useState([])
  const [publications, setPublications] = useState([])
  const [owner, setOwner] = useState('')
  const [body, setBody] = useState('')
  const [nextActivities, setNextActivities] = useState([])

  const history = useHistory()

  const day = new Date().getDate()
  const month = new Date().getMonth()+1

  useEffect(()=>{
    api.get('/classroom', {
        headers: {
            Authorization: classroom_id, 
        }
    }).then(response => {
        setActivities(response.data);
    })
}, [classroom_id])

  useEffect(()=>{
    api.get('/classroom/comments', {
        headers: {
            Authorization: classroom_id, 
        }
    }).then(response => {
        setComments(response.data);
    })
  }, [classroom_id])

  useEffect(()=>{
    const organizedPublications = [].concat(activities).concat(comments)
    .sort((a, b) => a.day < b.day ? 1 : -1)
    .sort((a, b) => a.month < b.month ? 1 : -1)
    .reverse()

    setPublications(organizedPublications)
    console.log(comments)
  }, [activities, comments])

  useEffect (()=>{
    const nextActivities = activities.map(activity => {
      if(
        (activity.deadline_day < day+7 && activity.deadline_month === month)
        || (activity.deadline_day < 7-(30-day) && activity.deadline_month === month+1)
      ){
        return(activity)
      }
      return null 
    })
    .filter(activity=>{
      return activity !== null
    })

    setNextActivities(nextActivities)
  },[activities, day, month])

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  async function handleSendComment(e){
    e.preventDefault();
    console.log(name)
    
    console.log(owner)
    
    try{
      setOwner(name)
        const response = await api.post('/classroom', { owner, body }, {
          headers: {
            Authorization: classroom_id
          }
        })
        console.log(comments)
        console.log(response)
        setComments([...comments, response.data])

        history.push('/classroom');
    }catch (err) {
        alert('Erro ao fazer comentário.')
    }
  }

  function handleGoToActivity(title, deadline_day, deadline_month, day, month, body) {
    localStorage.setItem('title', title)
    localStorage.setItem('deadline_day', deadline_day)
    localStorage.setItem('deadline_month', deadline_month)
    localStorage.setItem('day', day)
    localStorage.setItem('month', month)
    localStorage.setItem('body', body)
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
              <Link className="link">
                <p>{classroom_name}</p>
              </Link>
              <span>{classroom_description}</span>
            </div>
            
        </section>
        
        <div className="navigation">
          <button id="mural" className = "button_pressed">
            <p>Mural</p> 
          </button>
          <Link className="link" to="/classroom/people">
            <button id="pessoas" >
              <p>Pessoas</p> 
            </button>
          </Link>
        </div>

        <div className="circle" onClick={()=> handleLogout()}>
          {name.trim().charAt(0)}
        </div>

      </header>

    <div className="content">
      <div className="banner">
        <div>
          <Link className="link">
            <p>{classroom_name}</p>
          </Link>
          <span>{classroom_description}</span>
        </div>
      </div>

      <div className="activities_container">
        <aside>
          <p>Próximas atividades</p>

          { nextActivities[0] && (
            <ul>
            {
            nextActivities.map(activitie=>(
              <li className="next_activity" key={activitie.id}>

                <div className="activity_info">
                  
                  <span>Data de entrega: {activitie.deadline_day}/{activitie.deadline_month}</span>
                  <Link className="link" to="/classroom/activity">
                    <p onClick={()=>handleGoToActivity(
                          activitie.title, 
                          activitie.deadline_day,
                          activitie.deadline_month,
                          activitie.day,
                          activitie.month,
                          activitie.body
                        )}>{activitie.title}</p>
                  </Link>

                </div>
              </li>
            ))
            }
            </ul>
          )}

          { !nextActivities[0] && ( 

              <div className="none_activity">
                <span>Nenhuma atividade para a próxima semana</span>
              </div>
              
          )}


          <button>Visualizar tudo</button>

        </aside>
      
      <div>
        
        <div 
          id="create_comment" 
          className="create_comment" 
        >
          <textarea 
            placeholder='Compartilhe com sua turma...' 
            value = {body}
            onChange = {e => 
            setBody(e.target.value)}
          ></textarea> 

          <div> 
            <button onClick={handleSendComment}><p>Publicar</p></button> 
          </div>
        </div>

        <ul className="activities_list">

          {
            publications.map(publication=>{
              if(publication.title){
                return(
                  <li className="activity" key={'activity'+publication.id}>
                    <div className="activity_circle">
                      <FiClipboard size={20}/>
                    </div>

                    <div className="activity_info">
                      <Link className="link" to="/classroom/activity">
                        <p onClick={()=>handleGoToActivity(
                          publication.title, 
                          publication.deadline_day,
                          publication.deadline_month,
                          publication.day,
                          publication.month,
                          publication.body
                        )}>
                          {publication.title}
                        </p>
                      </Link>
                      <span>{publication.day}/{publication.month}</span>
                    </div>
                  </li>
                )
              }

              if(!publication.title){
                return(
                  <li className="comment" key={'comment'+publication.id}>

                    <div className="comment_header">

                      <div className="circle">
                        {publication.owner.trim().charAt(0)}
                      </div>

                      <div className="comment_info">
                        <p>{publication.owner}</p>
                        <span>{publication.day}/{publication.month}</span>
                      </div>

                    </div>
                    
                    <div className="comment_body">
                      <p>{publication.body}</p>
                    </div>
                    
                  </li>
                )
              }
            })
          }
          
        </ul> 
      
      </div>
        
      </div>

      
    </div>

    </>
  )
}