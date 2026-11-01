import './App.css';
import data, { getImageUrl, type Person } from './data.js';
import { useState, type ReactElement } from 'react';

export default function ScientistList() {
  const [index, setIndex] = useState(0);
  const scientists = data.map(s => <Scientist key={s.id} person={s} />);

  return (
    <section>
      <button onClick={() => setIndex(index + 1)}>Click Me!({index})</button>
      <h2>Scientist List:</h2>
      <ul>{scientists}</ul>
    </section>
  );
}

function Scientist({ person }: { person: Person }) {
  return (
    <li className="sc-item">
      <img className="sc-img" src={getImageUrl(person)} alt="" />
      <div className="sc-desc">
        <h4>{person.name}</h4>
        <p>
          Profession: {person.profession}, known for <span>{person.accomplishment}</span>
        </p>
      </div>
    </li>
  );
}
