import { useState } from 'react';

export const useEventPrepare = <T, U extends Function>(
  [state, setState]: [T, U],
  handler?: (e: Event) => any,
): [
  T,
  (...s: U extends (...p: infer A) => any ? A : never) => (e: Event) => any,
] => {
  return [
    state,
    (...p: U extends (...p: infer A) => any ? A : never) =>
      (e: Event) => (handler?.(e), setState(p)),
  ] as any;
};

export const useTrigger = (def: boolean = false) => {
  const [trigger, setTrigger] = useState(def);
  const f = (b: boolean = !trigger) => setTrigger(b);
  return [trigger, f] as [typeof trigger, typeof f];
};

const [s, setS] = useEventPrepare(useTrigger(false));
