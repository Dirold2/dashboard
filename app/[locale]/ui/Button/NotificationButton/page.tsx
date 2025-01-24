import { useNotification } from '@component/Context';
import { JSX } from 'react/jsx-runtime';

import Button from '../Button';

function NotificationButton(): JSX.Element {
  const { addNotification } = useNotification();

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    addNotification('ALert!');
  };

  return <Button onClick={handleClick}>alert</Button>;
}

export default NotificationButton;
