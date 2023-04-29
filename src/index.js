import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeSelect from './TimeSelect';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    width: 100%;
    height: 90vh;
    background-color: hsl(0, 0%, 94%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }

  #root {
    height: 464px;
    width: 580px;
    background-color: hsl(0, 0%, 100%);
    border-radius: 4% 4% 30%;
    padding: 3%;
    font-family: 'Poppins', sans-serif;
    @media (max-width: 375px) {
      width: 90%;
      border-radius: 4% 4% 22%
    }
  }

  input {
    font-size: 32px;
    padding: 10px 15px;
    width: 100px;
    margin-right: 30px;
    font-weight: 700;
    border-radius: 7px;
    border-style: solid;
    border-width: thin;
    border-color: hsl(0, 0%, 86%);
    outline: none;
    @media (max-width: 375px) {
      font-size: 23px;
      width: 60px;
      margin-right: 23px;
    }
  }

  input[type=number]:focus {
    border-color: hsl(259, 100%, 65%);
  }

  h1 {
    color: hsl(259, 100%, 65%);
    font-size: 70px;
    margin: 0;
    font-weight: 800;
    font-style: italic;
    @media (max-width: 375px) {
      font-size: 55px;
    }
  }

  h2 {
    font-size: 75px;
    font-weight: 800;
    font-style: italic;
    margin: 0;
    margin-left: 10px;
    @media (max-width: 375px) {
      font-size: 55px;
    }
  }

  p {
    margin: 0 0 5px 0;
    font-size: 10px;
    color: hsl(0, 1%, 44%);
    font-weight: 700;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap" rel="stylesheet"></link>
    <GlobalStyle/>
    <TimeSelect />
  </React.StrictMode>
);