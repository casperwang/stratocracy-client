import React from 'react';
import './cell.css';

const getColor = (type, owner) => {
  if (type === "obstacle") return "gray_cell";
  if (type === "invisible") return "darkgray_cell";
  if (type === "invisible_obstacle") return "darkgray_cell";
  if (type === "castle" && owner === 0) return "darkgray_cell";
  if (owner !== 0) return "cell_"+owner;
  return "";
}

export default function Cell({ cell, isActive, onClick }) {
  return (
  <div className={
    "cell " +
    cell.type + " " +
    getColor(cell.type, cell.owner) +
    (isActive ? " active" : "")
    } onClick={onClick}>
    { cell.val > 0 ? cell.val : "" }
  </div>
  );
}