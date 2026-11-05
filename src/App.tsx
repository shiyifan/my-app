import './App.css';
import data, { type Person } from './data.js';
import { useReducer, useState } from 'react';
import StyledButton from './StyledButton.js';
import ScientistItem from './ScientistItem.js';
import PlayerReg from './PlayerReg.js';
import PlayerBoard from './PlayerBoard.js';
import { AppContext } from './contexts.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const scientists = data.map(s => <Scientist key={s.id} person={s} />);
  const [apiKey, dispathApiKey] = useReducer(requestNewApiKey, '_g_289c8a0c');

  return (
    <AppContext value={{ apiKey: apiKey, update: dispathApiKey }}>
      <section>
        <StyledButton onClick={() => setIndex(index + 1)}>Click Me!({index})</StyledButton>
        <PlayerBoard />
        <PlayerReg />
        <h2>Scientist List:</h2>
        <ul>{scientists}</ul>
      </section>
    </AppContext>
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

function requestNewApiKey(apiKey: string) {
  return randStr(8);
}

function randStr(length: number) {
  const chars = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    result += randomChar;
  }

  return result;
}
