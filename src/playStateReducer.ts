export type PlayState = boolean[];

export enum PlayActionType {
  SET_ONE,
  SET_MULTIPLE,
  SET_ALL
}

export interface PlayAction {
  type: PlayActionType;
  isPlaying: boolean;
  keyIndex?: number;
  keys?: number[];
}

export default function playStateReducer(state: PlayState, action: PlayAction) {
  switch (action.type) {
    case PlayActionType.SET_ONE:
      if (!action.keyIndex && action.keyIndex !== 0) {
        throw new Error(
          '`keyIndex` property is required for SET_ONE action type'
        );
      }
      const newState = state.slice();
      newState.splice(action.keyIndex, 1, action.isPlaying);
      return newState;
    case PlayActionType.SET_MULTIPLE:
      return state.map((playing, i) => {
        // TS makes us do this check inside the loop - probably should avoid
        // this, and also only do these type of checks in dev
        if (!action.keys) {
          throw new Error(
            '`keys` property is required for SET_MULTIPLE action type'
          );
        }
        if (action.keys.includes(i)) {
          return action.isPlaying;
        }
        return state[i];
      });
    case PlayActionType.SET_ALL:
      return new Array(state.length).fill(action.isPlaying);
    default:
      return state;
  }
}
