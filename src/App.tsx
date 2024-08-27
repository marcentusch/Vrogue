import './App.css';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { constVoid } from 'fp-ts/function';
import { useEffect } from 'react';

type Direction = 'Up' | 'Down' | 'Left' | 'Right';

const keyToDirection: (key: string) => O.Option<Direction> = key => {
  switch (key) {
    case 'j':
      return O.some('Up');
    case 'k':
      return O.some('Down');
    case 'h':
      return O.some('Left');
    case 'l':
      return O.some('Right');
    default:
      return O.none;
  }
};

const handleMove = (direction: Direction): void => {
  console.log(`Moving ${direction}`);
  // Add your move logic here
};

function App() {
  const rows = 24;
  const columns = 16;

  const initialGrid = Array.from({ length: rows }, () => Array.from({ length: columns }, () => '.'));

  useEffect(
    () =>
      window.addEventListener('keydown', (event: KeyboardEvent) =>
        pipe(
          keyToDirection(event.key),
          O.fold(
            () => constVoid(),
            direction => handleMove(direction)
          )
        )
      ),
    []
  );

  return (
    <>
      <div className="grid">
        {initialGrid.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <div className="cell" key={`${rowIndex}-${columnIndex}`}>
              {cell}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
