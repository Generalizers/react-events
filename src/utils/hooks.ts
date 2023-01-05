import { useState } from 'react';

export const useEventPrepare = <T, U extends Function, P extends Event = any>(
  [state, setState]: [T, U],
  handler?: (e: P) => any,
): [
  T,
  (...s: U extends (...p: infer A) => any ? A : never) => (e: P) => any,
] => {
  return [
    state,
    (...p: U extends (...p: infer A) => any ? A : never) =>
      (e: P) => (handler?.(e), setState(p)),
  ] as any;
};

export const useTrigger = (def: boolean = false) => {
  const [trigger, setTrigger] = useState(def);
  const f = (b: boolean = !trigger) => setTrigger(b);
  return [trigger, f] as [typeof trigger, typeof f];
};
