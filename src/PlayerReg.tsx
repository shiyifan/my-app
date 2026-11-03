import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import './PlayerReg.css';
import PlayerList, { type Player } from './PlayerList';

let playerCount = 0;

export default function PlayerReg() {
  const defaultProfile: Player = { id: 0, name: '', age: 0, address: { city: '', street: '' } };
  const [profile, setProfile] = useState(defaultProfile);
  const [players, setPlayers] = useState([] as Player[]);

  return (
    <div className="player-reg">
      <form onSubmit={handleSave}>
        <label>
          Name: <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </label>
        <label>
          Age: <input type="number" name="age" value={profile.age || ''} onChange={handleChange} />
        </label>
        <label>
          City: <input type="text" name="city" value={profile.address.city} onChange={handleChange} />
        </label>
        <label>
          Street: <input type="text" name="street" value={profile.address.street} onChange={handleChange} />
        </label>
        <input type="submit" value={'Save'} />
      </form>

      <PlayerList players={players} />
    </div>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const newValue = e.target.value;

    switch (e.target.name) {
      case 'name':
        setProfile({ ...profile, name: newValue });
        break;
      case 'age':
        const newAge = parseInt(newValue);
        if (newAge === 0) return;

        setProfile({ ...profile, age: newAge });
        break;
      case 'city':
        setProfile({ ...profile, address: { ...profile.address, city: newValue } });
        break;
      case 'street':
        setProfile({ ...profile, address: { ...profile.address, street: newValue } });
        break;
    }
  }

  function handleSave(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlayers([...players, { ...profile, id: playerCount++ }]);
    setProfile({ ...defaultProfile });
  }
}
