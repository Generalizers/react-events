import { useState } from 'react';

export const useEventPrepare = <T, U extends (...p: any[]) => any>(
  [state, setState]: [T, U],
  handler?: (e: Event) => any,
): [T, U] => {
  return [state, (p: T) => (e: Event) => (handler?.(e), setState(p))] as any;
};

export const useTrigger = (def: boolean = false) => {
  const [trigger, setTrigger] = useState(def);
  const f = (b: boolean = !trigger) => setTrigger(b);
  return [trigger, f] as [typeof trigger, typeof f];
};
