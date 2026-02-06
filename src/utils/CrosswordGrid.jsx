import { useEffect, useState } from 'react';
import { Word } from '../classes/Word';

function CrosswordGrid({crossword}){
  const grid = crossword.grid;

  return(
    <>
      <table id='filledTable'>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>{
              row.map((cell, colIndex) => {
                let cellValue = Number(cell);
                if(typeof cell === 'object'){
                  return cell.direction === Word.DIRECTIONS.HORIZONTAL
                    ? <th key={colIndex} className="numberCell hotizontalNumber">{cell.value}</th>
                    : <th key={colIndex} className="numberCell verticalNumber">{cell.value}</th>
                }
                return isNaN(cellValue) 
                  ? <th key={colIndex} className="filledCell">{cell}</th>
                  : <th key={colIndex} className="emptyCell"></th>
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <table id='emptyTable' hidden>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>{
              row.map((cell, colIndex) => {
                let cellValue = Number(cell);
                if(typeof cell === 'object'){
                  return cell.direction === Word.DIRECTIONS.HORIZONTAL
                    ? <th key={colIndex} className="numberCell hotizontalNumber">{cell.value}</th>
                    : <th key={colIndex} className="numberCell verticalNumber">{cell.value}</th>; 
                }
                return isNaN(cellValue) 
                  ? <th key={colIndex} className="filledCell"></th>
                  : <th key={colIndex} className="emptyCell"></th>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { CrosswordGrid }