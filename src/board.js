import React, { useState } from 'react';
import './board.css';
import Cell from './cell.js';

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