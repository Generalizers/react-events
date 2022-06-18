import { useMouse } from 'utils/events';

useMouse(
  'click',
  () => {
    console.log('mouse has been clicked');
  },
  [],
);
