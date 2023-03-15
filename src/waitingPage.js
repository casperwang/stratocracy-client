import React from 'react';
import './css/waitingPage.css';

export default function WaitingPage({player_id}) {
  return(
    <div className='waiting'>
      Your player id is { player_id } <br></br>
      Waiting for the game to start...
    </div>
  )
}