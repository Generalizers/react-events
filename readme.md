# @generalizers/react-events

**Author** : Alan BLANCHET

## Installation

### NPM

```bash
npm i @generalizers/react-events
```

### SSH

```bash
npm i git+https://github.com/Generalizers/react-events.git
```

## Hooks

### useKey

The useKey hook is used to attach a key event on the document and detach it whenever the component is unmounted. It is updated based on the dependency list to add optimization.

#### Parameters

| parameter       | type                          | description                                                       |
| --------------- | ----------------------------- | ----------------------------------------------------------------- |
| type            | `"down"`, `"up"`, `"pressed"` | The type of the key                                               |
| f               | `() => void`                  | The function to be called and removed on mount / unmount / update |
| dependency list | `any[]`, `undefined`          | The react watch list that uses `useEffect` under the hood         |

### useMouse

The useMouse hook is used to attach a mouse event on the document and detach it whenever the component is unmounted. It is updated based on the dependency list to add optimization.

It is useful whenever you want to do an action if a user clicks outside of a specific inner box (not on the document). You can use `e.stopPropagation()` on this box to prevent the event to rise up to the document event.

#### Parameters

| parameter       | type                                                                         | description                                                       |
| --------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| type            | `"click"`, `"down"`, `"enter"`, `"leave"`, `"move"`,`"out"`,`"over"`, `"up"` | The type of the mouse event                                       |
| f               | `() => void`                                                                 | The function to be called and removed on mount / unmount / update |
| dependency list | `any[]`, `undefined`                                                         | The react watch list that uses `useEffect` under the hood         |

### useContextMenu

The useContextMenu hook function is called whenever the user right clicks and the browser menu pops up. You can override this feature and use the hook to manage states in react.

### useEvent

For a more general use. You can use the `useEvent` hook to create your custom hooks based on the document events
