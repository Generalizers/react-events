import { contextGenerator } from '@generalizers/react-context';
import React, { FunctionComponent, useState } from 'react';

import { useKey } from './events';

const {
  useHook: useExtendedKeybindings,
  Provider: ExtendedKeybindingsProvider,
  Consumer: ExtendedKeybindingsConsumer,
} = contextGenerator<ExtendedKeybinding[]>([], 'Keybindings');

export const KeybindingsProvider: FunctionComponent<{
  value: ExtendedKeybinding[];
  children: React.ReactNode;
}> = ({ value: keybindings, children }) => {
  return (
    <ExtendedKeybindingsProvider
      value={keybindings.map(
        ({ name, description, action, specialKeys, key }) => {
          return {
            name,
            description,
            action,
            specialKeys,
            key: key.toLocaleUpperCase(),
          };
        },
      )}
    >
      <ExtendedKeybindingsConsumer>
        {([keybindings]) => {
          useKey(
            'down',
            (e) => {
              keybindings
                .filter((k) => e.ctrlKey == k.specialKeys.includes('CTRL'))
                .filter((k) => e.altKey == k.specialKeys.includes('ALT'))
                .filter(
                  (k) =>
                    (e.key == 'altgraph') == k.specialKeys.includes('ALT GR'),
                )
                .filter((k) => e.shiftKey == k.specialKeys.includes('SHIFT'))
                .filter(
                  (k) => e.key.toLocaleUpperCase() == k.key.toLocaleUpperCase(),
                )
                .forEach((k) => {
                  k.action(e);
                });
            },
            [keybindings],
          );
          return <>{children}</>;
        }}
      </ExtendedKeybindingsConsumer>
    </ExtendedKeybindingsProvider>
  );
};

type SpecialKey = 'CTRL' | 'ALT' | 'ALT GR' | 'TAB' | 'SHIFT' | 'CAPSLOCK';

interface BaseKeybinding {
  name: string;
  description?: string;
  action: (e: KeyboardEvent) => any;
}

export interface ExtendedKeybinding extends BaseKeybinding {
  specialKeys: SpecialKey[];
  key: string;
}

interface Keybinding extends BaseKeybinding {
  keys: string[];
}

interface KeybinderReturn {
  state: Keybinding[];
  activate: (name: string) => any;
}

export const useKeybindings = () =>
  useExtendedKeybindings()[0].map((keybinding) =>
    CKeybinding.asKeybinding(keybinding),
  );

export const useKeybinder = (): KeybinderReturn => {
  const [keybindings, setKeybinding] = useExtendedKeybindings();
  const [pressed, setPressed] = useState<string[]>([]);
  const [name, setName] = useState<string>();

  useKey(
    'down',
    (e) => {
      if (e.key.toLocaleUpperCase() != 'ESCAPE') {
        if (name) {
          e.preventDefault();
          const { key } = e;
          const parsed = CKeybinding.parseKey(key);
          const newPressed = [...pressed, parsed];
          const finished = CKeybinding.isFinished(key);

          if (!pressed.includes(parsed)) {
            if (finished) {
              setPressed([]);
              setKeybinding(
                CKeybinding.override(keybindings, name, newPressed),
              );
              setName(undefined);
            } else setPressed(newPressed);
          }
        }
      } else {
        setPressed([]);
        setName(undefined);
      }
    },
    [pressed, name],
  );

  return {
    activate: (name: string) => {
      setName(name);
      setPressed([]);
    },
    state: keybindings.map((keybinding) => {
      return CKeybinding.asKeybinding(
        keybinding,
        keybinding.name == name ? [...pressed, '...'] : undefined,
      );
    }),
  };
};

class CKeybinding {
  static specials = [
    'CONTROL',
    'CTRL',
    'ALT',
    'ALTGRAPH',
    'ALT GR',
    'NUMLOCK',
    'NUM LOCK',
    'SHIFT',
  ];

  static asKeybinding(
    { name, description, action, specialKeys, key }: ExtendedKeybinding,
    keys?: string[],
  ): Keybinding {
    return {
      name,
      description,
      action,
      keys: keys ?? [...specialKeys, key],
    };
  }

  static getExtendedByName(keybindings: ExtendedKeybinding[], name: string) {
    const keybinding = keybindings.find((keybind) => keybind.name == name);
    if (!keybinding)
      throw new Error(`Keybinding with name ${name} doesn't exist`);
    return keybinding;
  }

  static getKeybindingByName = (
    keybindings: ExtendedKeybinding[],
    name: string,
  ) =>
    CKeybinding.asKeybinding(CKeybinding.getExtendedByName(keybindings, name));

  static override = (
    keybindings: ExtendedKeybinding[],
    name: string,
    keys: string[],
  ) => {
    const extended = CKeybinding.getExtendedByName(keybindings, name);
    const { key, specialKeys } = CKeybinding.splitKeys(keys);
    const index = keybindings.findIndex(
      (keybinding) => keybinding.name == name,
    );

    keybindings[index] = { ...extended, key, specialKeys };
    return [...keybindings];
  };

  static parseKey = (key: string) => {
    switch (key.toLocaleUpperCase()) {
      case 'CONTROL':
        return 'CTRL';
      case 'ALTGRAPH':
        return 'ALT GR';
      case 'NUMLOCK':
        return 'NUM LOCK';
    }
    return key.toLocaleUpperCase();
  };

  static splitKeys = (keys: string[]) => ({
    specialKeys: keys.filter((key) =>
      CKeybinding.isSpecial(key),
    ) as SpecialKey[],
    key: keys.filter((key) => !CKeybinding.isSpecial(key))[0],
  });

  static isFinished = (key: string) => !CKeybinding.isSpecial(key);

  static isSpecial(key: string) {
    return this.specials.includes(key.toLocaleUpperCase());
  }
}
