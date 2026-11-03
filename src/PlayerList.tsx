import styles from './PlayerList.module.css';

export default function PlayerList({ players, onPlayerUpdate }: { players: Player[]; onPlayerUpdate: PlayerUpdateHandler }) {
  const playerJsx = players.map(p => <PlayerItem key={p.id} player={p} onUpdate={() => onPlayerUpdate(p.id)} />);

  return <ol>{playerJsx}</ol>;
}

function PlayerItem({ player, onUpdate }: { player: Player; onUpdate: PlayerUpdateHandler }) {
  return (
    <li>
      <h1 className={styles['player-name']}>
        {player.name}
        <span className={styles['player-age']}>{player.age}</span>
      </h1>
      <p className={styles['player-address']}>
        <span>{player.address.city}</span>
        <span>{player.address.street}</span>
        <button onClick={() => onUpdate(player.id)}>update</button>
      </p>
    </li>
  );
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

type PlayerUpdateHandler = (playerId: number) => void;
