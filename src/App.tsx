import './App.css';
import data, { type Person } from './data.js';
import { useState } from 'react';
import StyledButton from './StyledButton.js';
import ScientistItem from './ScientistItem.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const scientists = data.map(s => <Scientist key={s.id} person={s} />);

  return (
    <section>
      <StyledButton onClick={() => setIndex(index + 1)}>Click Me!({index})</StyledButton>
      <h2>Scientist List:</h2>
      <ul>{scientists}</ul>
    </section>
  );
}

function Scientist({ person }: { person: Person }) {
  return (
    <li className="sc-item">
      <ScientistItem person={person} />
    </li>
  );
}
