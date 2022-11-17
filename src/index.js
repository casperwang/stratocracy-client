import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Board from './board';
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

const Main = () => {
  const [ws, setWs] = useState(null);
  const [activeCell, setActiveCell] = useState({i:-1, j:-1});
  const [game, setGame] = useState(null);

  const url = document.URL;
  const port = 2000 + Number(url.slice(url.length - 5, url.length-1));
  const player_id = port - 5000;

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
    } else {
      setWs(webSocket(url.slice(0, url.length - 5) + port + '/'));
    }
  }, [ws]);

  useEffect(() => {
    const keyEvent = (event) => {
      let [di, dj] = [0, 0];
      let _activeCell = Object.assign({}, activeCell);
      if (event.key === "ArrowLeft") {
        if (_activeCell.j <= 0) return;
        if (game.board[_activeCell.i][_activeCell.j-1].type === BoardType.obstacle) return;
        [di, dj] = [0, -1];
        _activeCell.j--;
      } else if (event.key === "ArrowUp") {
        if (_activeCell.i <= 0) return;
        if (game.board[_activeCell.i-1][_activeCell.j].type === BoardType.obstacle) return;
        [di, dj] = [-1, 0];
        _activeCell.i--;
      } else if (event.key === "ArrowRight") {
        if (_activeCell.j >= game.col-1) return;
        if (game.board[_activeCell.i][_activeCell.j+1].type === BoardType.obstacle) return;
        [di, dj] = [0, 1];
        _activeCell.j++;
      } else if (event.key === "ArrowDown") {
        if (_activeCell.i >= game.row-1) return;
        if (game.board[_activeCell.i+1][_activeCell.j].type === BoardType.obstacle) return;
        [di, dj] = [1, 0];
        _activeCell.i++;
      } else {
        return;
      }
      if (player_id === 0) return;
      ws.emit('addMove', {player_id: player_id, p: activeCell, d: {i: di, j: dj}, is_half: false});
      setActiveCell(_activeCell);
    }
    document.addEventListener('keydown', keyEvent, false);
    return () => document.removeEventListener('keydown', keyEvent);
  }, [ws, game, setGame, activeCell, setActiveCell]);

  const initWebSocket = () => {
    ws.on('initialization', game => {
      setGame(game);
      ws.on('gameState', game => {
        setGame(game);
      });
    });
  }
  
  if (game === null) return;

  let board = (player_id === 0 ? game.board : game.players[player_id-1].board);

  return(
    <Board board={board} activeCell={activeCell} setActiveCell={setActiveCell} key="board"/>
  );
}

root.render(<Main />, document.getElementById('root'));