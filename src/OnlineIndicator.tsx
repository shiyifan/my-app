import { memo } from 'react';
import styles from './OnlineIndicator.module.scss';
import { useOnlineStatus } from './hooks';
import cn from 'classnames';

const OnlineIndicator = ({ onOnlineChanged }: { onOnlineChanged: () => void }) => {
  const online = useOnlineStatus();

  const onlineStyle = online ? 'online-indicator__online' : 'online-indicator__offline';

  console.log('online indicator rendering');

  return (
    <button className={cn(styles['online-indicator'], styles[onlineStyle])} onClick={onOnlineChanged}>
      {online ? 'Online' : 'Offline'}
    </button>
  );
};

export default memo(OnlineIndicator);
