import { useState } from 'react';
import './App.css';

export default function Gallery() {
  const a = 'Ivan';
  return (
    <>
      <section style={{ border: '4px dashed gray' }}>
        <h1>Woman scientist, {a}</h1>
        <Profile />
        <Profile />
      </section>
    </>
  );
}

function Profile() {
  return (
    <>
      <img src="https://react.dev/images/docs/scientists/MK3eW3Am.jpg" alt="woman scientist" />
    </>
  );
}
