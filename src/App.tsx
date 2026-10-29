import { useState } from 'react';
import './App.css';

export default function Gallery() {
  return (
    <>
      <section>
        <h1>Woman scientist</h1>
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
