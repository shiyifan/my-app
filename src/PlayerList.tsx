import { useContext, useReducer, useState, useEffect } from 'react';
import styles from './PlayerList.module.css';
import { PlayerContext } from './contexts';

export default function PlayerList({ players, onPlayerUpdate }: { players: Player[]; onPlayerUpdate: PlayerUpdateHandler }) {
  const playerJsx = players.map(p => <PlayerItem key={p.id} player={p} onUpdate={(id, city) => onPlayerUpdate(id, city)} />);

  return playerJsx.length === 0 ? null : <ol>{playerJsx}</ol>;
}

function PlayerItem({ player, onUpdate }: { player: Player; onUpdate: PlayerUpdateHandler }) {
  const [city, dispatchCity] = useReducer(cityReducer, player.address.city);
  const [editting, setEditting] = useState(false);

  const serverLocation = useContext(PlayerContext).serverLocation;

  const updateButton = <button onClick={() => setEditting(true)}>Update City</button>;
  const saveButton = (
    <button
      disabled={city == null || city.length === 0}
      onClick={() => {
        setEditting(false);
        onUpdate(player.id, city);
      }}
    >
      Save
    </button>
  );
  const cancelButton = (
    <button
      onClick={() => {
        setEditting(false);
        dispatchCity({ type: 'update', value: player.address.city });
      }}
    >
      Cancel
    </button>
  );

  return (
    <li>
      <h1 className={styles['player-name']}>
        {player.name}
        <span className={styles['player-age']}>{player.age}</span>
        <span className={styles['player-server-location']}>{serverLocation}</span>
      </h1>
      <p className={styles['player-address']}>
        {!editting && <span>{player.address.city}</span>}
        {editting && <input type="text" value={city} onChange={e => dispatchCity({ type: 'update', value: e.target.value })} />}

        <span>{player.address.street}</span>

        {editting && (
          <>
            {saveButton}
            {cancelButton}
          </>
        )}
        {!editting && updateButton}
      </p>
    </li>
  );
}

function cityReducer(currentCity: string, action: { type: 'update'; value: string }) {
  if (action.type === 'update') {
    return action.value;
  }

  throw new Error('error action type!');
}

export interface Player {
  id: number;
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
  };
}

type PlayerUpdateHandler = (playerId: number, newValue: string) => void;
