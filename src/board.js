import React from 'react';
import Cell from './cell.js';
import './css/board.css';

export default function Board({board, activeCell, setActiveCell}) {
  return (
    <div className="board">
      {
        board.map((row, i) => {
          return (
            <div style={{display:"flex"}}>
            {
              row.map((cell, j) => {
                return (<Cell
                  cell={cell}
                  isActive={activeCell.i === i && activeCell.j === j}
                  onClick={() => {
                    setActiveCell({i: i, j: j});
                  }}
                  key={"cell(" + i + "," + j + ")"}
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