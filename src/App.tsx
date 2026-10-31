import './App.css';
import data, { getImageUrl, type Person } from './data.js';
import type { ReactElement } from 'react';

export default function ScientistList() {
  const scientists = data.map(s => <Scientist key={s.id} person={s} />);

  return (
    <section>
      <NoKey />
      <NeedKey />
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

function NoKey() {
  const p1 = <p>Nokey1</p>;
  const p2 = <p>Nokey2</p>;
  const p3 = <p>Nokey3</p>;

  const r = parseInt('' + globalThis.Math.random() * 100);
  if (r % 2 === 0) {
    return (
      <div>
        {p1}
        {p3}
      </div>
    );
  }

  return (
    <div>
      {p1}
      {p2}
      {p3}
    </div>
  );
}

function NeedKey() {
  const p1 = <p>Key1</p>;
  const p2 = <p>Key2</p>;
  const p3 = <p>Key3</p>;

  return <div>{[p1, p2, p3]}</div>;
}
