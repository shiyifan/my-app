import styles from './OnlineIndicator.module.scss';
import { useOnlineStatus } from './hooks';
import cn from 'classnames';

export default function OnlineIndicator() {
  const online = useOnlineStatus();

  return <div className={cn(styles['online-indicator'])}>{online ? 'Online' : 'Offline'}</div>;
}
