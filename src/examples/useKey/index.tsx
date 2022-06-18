import { useKey } from '../../utils/events';

useKey(
  'down',
  (e) => {
    console.log('Key', e.code, 'pressed');
  },
  [],
);
