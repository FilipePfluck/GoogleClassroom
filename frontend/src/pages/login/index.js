import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import LogoImg from '../../assets/logo.png'
import { FiEye } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'
import '../../global.css'

export default function Login(){
  //funções de estilo

  function turnInputBlue(id){
    document.getElementById(id).className = "blue"
  }

  function turnInputWhite(id){
    document.getElementById(id).className = ""
  }

  function showPassword(id){
    if (document.getElementById(id).type === "password"){
      document.getElementById(id).type = "text"
    }
    else{
      document.getElementById(id).type = "password"
    }
  }

  //react

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  

    async function handleLogin(e){
        e.preventDefault();
        
        try{
            const response = await api.post('/login', { email, password })

            localStorage.setItem('email', email)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('id', response.data.id)

            history.push('/classrooms');
        }catch (err) {
            alert('Email ou senha incorretos.')
        }
    }

  return(
    <div className="loginContainer">
      <section className="form">
        <img src={LogoImg} alt="Google" className="logo"/>

        <p className="login">Fazer login</p>
        <p>Use sua conta do Google</p>

        <form onSubmit={ handleLogin }>
          
          <input 
            id="email" 
            type="email"
            className="a"
            onFocus = {() =>turnInputBlue("email")}
            onBlur = {() =>turnInputWhite("email")}
            placeholder = "E-mail"

            value = {email}
            onChange = {e => setEmail(e.target.value)}
          />
          
          <input 
            id="password" 
            type="password"
            className="a" 
            onFocus = {() => turnInputBlue("password")}
            onBlur = {() =>turnInputWhite("password")}
            placeholder = "Senha"

            value = {password}
            onChange = {e => setPassword(e.target.value)}
          />
          <span onClick = {()=>showPassword('password')}><FiEye/></span>
        
          <div className="button_group">
            
            <Link to="/register">
              <button className = "button_white" to="/register">Criar conta</button>
            </Link>

            <button className = "button">Próximo</button>

          </div>

        </form>
      </section>
    </div>
  )
}