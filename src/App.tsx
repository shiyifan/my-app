import './App.css';
import data, { type Person } from './data.js';
import { useState } from 'react';
import StyledButton from './StyledButton.js';
import ScientistItem from './ScientistItem.js';
import PlayerReg from './PlayerReg.js';
import PlayerBoard from './PlayerBoard.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const scientists = data.map(s => <Scientist key={s.id} person={s} />);

  return (
    <section>
      <StyledButton onClick={() => setIndex(index + 1)}>Click Me!({index})</StyledButton>
      <PlayerBoard />
      <PlayerReg />
      <h2>Scientist List:</h2>
      <ul>{scientists}</ul>
    </section>
  );
}

function Scientist({ person }: { person: Person }) {
  const [count, setCount] = useState(0);
  return (
    <li className="sc-item">
      <button onClick={() => setCount(count + 1)}>count({count})</button>
      <ScientistItem person={person} />
    </li>
  );
}
