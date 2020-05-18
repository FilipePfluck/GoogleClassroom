import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import LogoImg from '../../assets/logo.png'
import { FiEye, } from 'react-icons/fi'

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

  function turnInputRed(id){
    document.getElementById(id).className = "red"
  }

  function showPassword(id){
    if (document.getElementById(id).type === "password"){
      document.getElementById(id).type = "text"
    }
    else{
      document.getElementById(id).type = "password"
    }
  }

  function confirmPassord(id){

    if(document.getElementById(id).value !== document.getElementById("password").value){
      turnInputRed('confirm_password')
    }

    else{
      turnInputWhite('confirm_password')
    }
  }

  //Funções React

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            password
        }

        try {
          await api.post('register', data);
          history.push('/');

        } catch (err){
            alert('Erro no cadastro. Tente novamente');
        }
    }

  return(
    <div className="loginContainer">
      <section className="form">
        <img src={LogoImg} alt="Google" className="logo"/>

        <p className="login">Criar sua conta do Google</p>

        <form onSubmit={ handleRegister }>

          <input 
            id="name" 
            type="text"
            className="a"
            onFocus = {() =>turnInputBlue("name")}
            onBlur = {() =>turnInputWhite("name")}
            placeholder = "Nome Completo"

            value = {name}
            onChange = { e => setName(e.target.value)}
          />
          
          <input 
            id="email" 
            type="email"
            className="a"
            onFocus = {() =>turnInputBlue("email")}
            onBlur = {() =>turnInputWhite("email")}
            placeholder = "E-mail"

            value = {email}
            onChange = { e => setEmail(e.target.value)}
          />
          
          <input 
            id="password" 
            type="password"
            className="a" 
            onFocus = {() => turnInputBlue("password")}
            onBlur = {() =>turnInputWhite("password")}
            placeholder = "Senha"

            value = {password}
            onChange = { e => setPassword(e.target.value)}
          />
          <span onClick = {()=>showPassword('password')}><FiEye/></span>

          <input 
            id="confirm_password" 
            type="password"
            className="a" 
            onFocus = {() => turnInputBlue("confirm_password")}
            onBlur = {() =>confirmPassord("confirm_password")}
            placeholder = "Confirme sua senha"
          />
          <span onClick = {()=>showPassword('confirm_password')}><FiEye/></span>
        
          <div className="button_group">
            
            <Link to="/">
              <button className = "button_white">Voltar</button>
            </Link>

            <button className = "button">Próximo</button>

          </div>

        </form>
      </section>
    </div>
  )
}