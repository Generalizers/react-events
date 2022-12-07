import { useState } from 'react';

export const useTrigger = (def: boolean = false) => {
  const [trigger, setTrigger] = useState(def);
  const f = (b: boolean = !trigger) => setTrigger(b);
  return [trigger, f] as [typeof trigger, typeof f];
};
