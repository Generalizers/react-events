import { useKeybinder } from '../../utils/keybindings';
import { FunctionComponent } from 'react';

import style from './index.module.scss';

export const Keybindings: FunctionComponent = () => {
  const { state: keybindings, activate } = useKeybinder();

  return (
    <div className={style.main}>
      <div>
        {keybindings.map((keybinding, i) => {
          return (
            <div
              key={`keybinding-${keybinding.name}`}
              onClick={() => activate(keybinding.name)}
            >
              <div className={style.mainName}>
                <div>{keybinding.name}</div>
              </div>
              <div className={style.mainSeperation}></div>
              <div className={style.mainKeys}>
                {keybinding.keys.map((key, i, { length }) => {
                  return (
                    <>
                      <div className={style.mainKey}>{key}</div>
                      {i + 1 < length && <div>+</div>}
                    </>
                  );
                })}
              </div>
              <div className={style.mainSeperation}></div>
              <div className={style.mainDesc}>{keybinding.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
