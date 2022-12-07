import { useState } from 'react';

export const useTrigger = (def: boolean = false) => {
  const [trigger, setTrigger] = useState(def);
  return [trigger, () => setTrigger(!trigger)];
};
