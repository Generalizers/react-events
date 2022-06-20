import { KeybindingsProvider } from '../../utils/keybindings';
import { Keybindings } from '../Keybindings';
import { FunctionComponent } from 'react';

export const App: FunctionComponent = () => {
  return (
    <KeybindingsProvider
      value={[
        {
          name: 'Zoom',
          specialKeys: ['CTRL'],
          key: 'a',
          action: (e) => {
            e.preventDefault();
            console.log('HIT');
          },
        },
        {
          name: 'Delete',
          specialKeys: ['CTRL'],
          key: 'd',
          action: (e) => {
            e.preventDefault();
            console.log('DELETE');
          },
        },
        {
          name: 'Select All',
          specialKeys: [],
          key: 'a',
          action: (e) => {
            e.preventDefault();
            console.log('SELECT ALL');
          },
          description: 'Select all the elements on the board',
        },
      ]}
    >
      <Keybindings />
    </KeybindingsProvider>
  );
};
