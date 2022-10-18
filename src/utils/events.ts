import { DependencyList, useEffect } from 'react';

window;

/**
 * Allows to use a document event listener
 * @param type The type of DOM event
 * @param f The document callback
 * @param deps The dependency list
 */
export const useEvent = (
  type: keyof DocumentEventMap,
  f: (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
  deps?: DependencyList,
  element: Window | Document | Element = document,
) => {
  useEffect(() => {
    element.addEventListener(type, f);
    return () => {
      element.removeEventListener(type, f);
    };
  }, deps ?? []);
};

type KeyType = 'down' | 'press' | 'up';
type MouseType =
  | 'down'
  | 'enter'
  | 'leave'
  | 'move'
  | 'out'
  | 'over'
  | 'up'
  | 'click';

/**
 * A subset of useEffect but with the global
 * document event listener
 * @param type The type of key event
 * @param f The document callback
 * @param deps The dependency list
 */
export const useKey = (
  type: KeyType,
  f: (this: Document, ev: KeyboardEvent) => any,
  deps?: DependencyList,
  element: Window | Document | Element = document,
) => {
  useEvent(
    `key${type}`,
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps,
    element,
  );
};

/**
 * A subset of useEffect but with the global
 * document event listener
 * @param type The type of mouse event
 * @param f The document callback
 * @param deps The dependency list
 */
export const useMouse = (
  type: MouseType,
  f: (e: MouseEvent) => any,
  deps?: DependencyList,
  element: Window | Document | Element = document,
) => {
  useEvent(
    type == 'click' ? type : `mouse${type}`,
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps,
    element,
  );
};

/**
 * A subset of useEffect but with the global
 * document event listener
 * @param f The document callback
 * @param deps The dependency list
 */
export const useContextMenu = (
  f: (e: Event) => any,
  deps?: DependencyList,
  element: Window | Document | Element = document,
): void => {
  useEvent(
    'contextmenu',
    f as (this: Document, ev: DocumentEventMap[keyof DocumentEventMap]) => any,
    deps,
    element,
  );
};

export enum Click {
  Left,
  Middle,
  Right,
}
