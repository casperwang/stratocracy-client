import React from 'react';
import './css/menuPage.css';

export default function MenuPage({onClick}) {

  const newGame = () => {
    onClick('menuPage', {admin: true});
  }

  const joinGame = () => {
    onClick('menuPage', {admin: false});
  }

  return(
    <div className='menu'>
      <button onClick={newGame}>New Game</button>
      <button onClick={joinGame}>Join Game</button>
    </div>
  )
}