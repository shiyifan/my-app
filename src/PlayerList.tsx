import styles from './PlayerList.module.css';

export default function PlayerList({ players }: { players: Player[] }) {
  const playerJsx = players.map(p => <PlayerItem key={p.id} player={p} />);

  return <ol>{playerJsx}</ol>;
}

function PlayerItem({ player }: { player: Player }) {
  return (
    <li>
      <h1 className={styles['player-name']}>
        {player.name}
        <span className={styles['player-age']}>{player.age}</span>
      </h1>
      <p className={styles['player-address']}>
        <span>{player.address.city}</span>
        <span>{player.address.street}</span>
        <button onClick={handleClick}>update</button>
      </p>
    </li>
  );

  function handleClick() {
    player.address.city += '?';

  }
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
