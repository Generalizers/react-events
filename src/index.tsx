<<<<<<< HEAD
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
=======
import { render } from 'react-dom';

import { App } from './components/App';

render(<App />, document.getElementById('root'));
>>>>>>> a62b489 ([DEV]Added the utils from old lib)
