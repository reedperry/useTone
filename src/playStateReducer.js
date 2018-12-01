export interface PlayState {
  [key: string]: boolean;
}

export interface PlayAction {
  key: string;
  isPlaying: boolean;
}

export default function playStateReducer(state: PlayState, action: PlayAction) {
  if (action.isPlaying === true) {
    return {
      ...state,
      [action.key]: true
    };
  } else if (action.isPlaying === false) {
    return {
      ...state,
      [action.key]: false
    };
  }
  return state;
}
