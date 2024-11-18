import { useNotification } from '@cmp/Context';
import Button from '../Button';
import { JSX } from 'react/jsx-runtime';

function NotificationButton(): JSX.Element {
  const { addNotification } = useNotification();

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    addNotification('ALert!');
  };

  return <Button onClick={handleClick}>alert</Button>;
}

export default NotificationButton;