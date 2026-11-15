import styles from './OnlineIndicator.module.scss';
import { useOnlineStatus } from './hooks';
import cn from 'classnames';

export default function OnlineIndicator() {
  const online = useOnlineStatus();

  const onlineStyle = online ? 'online-indicator__online' : 'online-indicator__offline';

  return <div className={cn(styles['online-indicator'], styles[onlineStyle])}>{online ? 'Online' : 'Offline'}</div>;
}
