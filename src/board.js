import React from 'react';
import Cell from './cell.js';
import './css/board.css';

export default function Board({board, activeCell, setActiveCell}) {
  let [ai, aj] = activeCell;
  return (
    <div className="board">
      {
        board.map((row, i) => {
          return (
            <div style={{display:"flex"}} key={'row('+i+')'}>
            {
              row.map((cell, j) => {
                return (<Cell
                  cell={cell}
                  isActive={ai === i && aj === j}
                  onClick={() => {
                    setActiveCell([i, j]);
                  }}
                  key={'cell('+i+','+j+')'}
                  />)
              })
            }
            <br />
            </div>
          )
        })
      }
    </div>
  );
}