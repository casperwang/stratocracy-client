import React, { useState } from 'react';
import './css/adminPage.css';

export default function AdminPage({onClick}) {
  const [setting, setSetting] = useState({
    row: 19,
    col: 25,
    real_player_cnt: 1,
    ai_player_cnt: 1
  });

  const handleChange = () => {
    setSetting({
      row: parseInt(document.getElementById('row').value),
      col: parseInt(document.getElementById('col').value),
      real_player_cnt: parseInt(document.getElementById('real_player_cnt').value),
      ai_player_cnt: parseInt(document.getElementById('ai_player_cnt').value)
    });
  }

  const handleSubmit = () => {
    onClick('adminPage', {setting: setting});
  }
  
  return(
    <div className='form'>
      <div className='inputElement'>
        <label>Board Height</label><br></br>
        <input type='range' id='row' min='10' max='28' value={setting.row} onChange={handleChange}></input><br></br>
      </div>
      <div className='inputElement'>
        <label>Board Width</label><br></br>
        <input type='range' id='col' min='10' max='40' value={setting.col} onChange={handleChange}></input><br></br>
      </div>
      <div className='inputElement'>
        <label>Number of Real Player</label><br></br>
        <input type='number' id='real_player_cnt' min='0' max='8' value={setting.real_player_cnt} onChange={handleChange}></input><br></br>
      </div>
      <div className='inputElement'>
        <label>Number of AI Player</label><br></br>
        <input type='number' id='ai_player_cnt' min='0' max='8' value={setting.ai_player_cnt} onChange={handleChange}></input><br></br>
      </div>
      <button onClick={handleSubmit}>Game Start</button>
    </div>
  );
}