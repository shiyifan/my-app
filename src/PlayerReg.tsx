import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import './PlayerReg.css';
import PlayerList, { type Player } from './PlayerList';
import { useImmer } from 'use-immer';

let playerCount = 0;

export default function PlayerReg() {
  const defaultProfile: Player = { id: 0, name: '', age: 0, address: { city: '', street: '' } };
  const [profile, setProfile] = useState(defaultProfile);
  const [players, updatePlayers] = useImmer([] as Player[]);
  const [saving, setSaving] = useState(false);

  const canSubmit = !saving && profile.name && profile.age > 0 && profile.address.city && profile.address.street;

  return (
    <div className="player-reg">
      <form onSubmit={handleSave}>
        <label>
          Name: <input type="text" name="name" disabled={saving} value={profile.name} onChange={handleChange} />
        </label>
        <label>
          Age: <input type="number" name="age" disabled={saving} value={profile.age || ''} onChange={handleChange} />
        </label>
        <label>
          City: <input type="text" name="city" disabled={saving} value={profile.address.city} onChange={handleChange} />
        </label>
        <label>
          Street: <input type="text" name="street" disabled={saving} value={profile.address.street} onChange={handleChange} />
        </label>
        <input type="submit" disabled={!canSubmit} value={'Save'} />
      </form>

      <PlayerList players={players} onPlayerUpdate={handlePlayerUpdate} />
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

  async function handleSave(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);

    updatePlayers([...players, { ...profile, id: playerCount++ }]);
    setProfile({ ...defaultProfile });
  }

  function handlePlayerUpdate(playerId: number, city: string) {
    updatePlayers(draft => {
      const p = draft.find(p => p.id === playerId)!;
      p.address.city = city;
    });
  }
}
