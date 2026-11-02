import { useState } from 'react';
import type { ChangeEvent, ChangeEventHandler, MouseEventHandler, ReactNode, SubmitEvent } from 'react';
import type { Person } from './data';

export default function SayHello({ person }: { person: Person }) {
  const [recipient, setRecipient] = useState('Alice');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const firstName = person.name.split(' ')[0];

  return (
    <form onSubmit={handleSubmit}>
      <To recipient={recipient} onRecipientChange={r => setRecipient(r)} />
      <MessageBox message={message} onMessageChange={m => setMessage(m)} />
      <Submit>Send</Submit>
      {result && <p>{result}</p>}
    </form>
  );

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(`${firstName} say hello to '${recipient}': ${message}`);
  }
}

function To({ recipient, onRecipientChange }: { recipient: string; onRecipientChange: (recipient: string) => void }) {
  return (
    <label>
      To:
      <select value={recipient} onChange={handleChange}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
      </select>
    </label>
  );

  function handleChange(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
    onRecipientChange(e.target.value);
  }
}

function MessageBox({ message, onMessageChange }: { message: string; onMessageChange: (message: string) => void }) {
  return <textarea placeholder="Message..." value={message} onChange={e => onMessageChange(e.target.value)}></textarea>;
}

function Submit({ children }: { children: ReactNode }) {
  return <button type="submit">{children}</button>;
}
