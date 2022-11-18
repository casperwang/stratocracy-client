import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Board from './board';
import MenuPage from './menuPage';
import AdminPage from './adminPage';
import webSocket from 'socket.io-client';

const BoardType = {
  obstacle: "obstacle",
  hometown: "hometown",
  land: "land",
  castle: "castle",
  invisible: "invisible",
  invisible_obstacle: "invisible_obstacle"
};

const root = ReactDOM.createRoot(document.getElementById('root'));

var player_id = -1;

const Main = () => {
  const [ws, setWs] = useState(null);
  const [activeCell, setActiveCell] = useState([-1, -1]);
  const [game, setGame] = useState(null);
  const [pageStatus, setPageStatus] = useState('menuPage');

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
    } else {
      setWs(webSocket('linux9.csie.ntu.edu.tw:5000/'));
    }
  }, [ws]);

  useEffect(() => {
    const keyEvent = (event) => {
      let [di, dj] = [0, 0];
      let [i, j] = activeCell;
      if (event.key === "ArrowLeft") {
        if (j <= 0) return;
        if (game.board[i][j-1].type === BoardType.obstacle) return;
        [di, dj] = [0, -1];
        j--;
      } else if (event.key === "ArrowUp") {
        if (i <= 0) return;
        if (game.board[i-1][j].type === BoardType.obstacle) return;
        [di, dj] = [-1, 0];
        i--;
      } else if (event.key === "ArrowRight") {
        if (j >= game.col-1) return;
        if (game.board[i][j+1].type === BoardType.obstacle) return;
        [di, dj] = [0, 1];
        j++;
      } else if (event.key === "ArrowDown") {
        if (i >= game.row-1) return;
        if (game.board[i+1][j].type === BoardType.obstacle) return;
        [di, dj] = [1, 0];
        i++;
      } else {
        return;
      }
      if (player_id === 0) return;
      ws.emit('addMove', {player_id: player_id, p: activeCell, d: [di, dj], is_half: false});
      setActiveCell([i, j]);
    }
    document.addEventListener('keydown', keyEvent, false);
    return () => document.removeEventListener('keydown', keyEvent);
  }, [ws, game, setGame, activeCell, setActiveCell]);

  const initWebSocket = () => {
    ws.on('playerId', (id) => {
      player_id = id;
      console.log(player_id);
      if (player_id === 0) {
        setPageStatus('adminPage');
      } else {
        setPageStatus('waitingPage');
      }
      ws.on('gameStart', init_game => {
        setGame(init_game);
        setPageStatus('board');
        ws.on('gameState', game => {
          setGame(game);
        });
      });
    });
  }

  const onClick = (page, props) => {
    if (page === 'menuPage') {
      if (props.admin === true) {
        ws.emit('newGame');
      } else {
        ws.emit('newPlayer');
      }
    } else if (page === 'adminPage') {
      ws.emit('createGame', props.setting);
    }
  }

  switch (pageStatus) {
    case 'menuPage':
      return <MenuPage onClick={onClick}/>;
    case 'adminPage':
      return <AdminPage onClick={onClick}/>;
    case 'waitingPage':
      return;
    case 'board':
      let board = (player_id === 0 ? game.board : game.players[player_id-1].board);
      return <Board board={board} activeCell={activeCell} setActiveCell={setActiveCell} key="board"/>;
    default:
      return
  }
}

root.render(<Main />);