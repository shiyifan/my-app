import { useState, type ChangeEvent } from 'react';

export default function PlayerReg() {
  const [profile, setProfile] = useState({ name: '', age: 0, address: { city: '', street: '' } });

  return (
    <>
      <form>
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
      </form>
    </>
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
}
