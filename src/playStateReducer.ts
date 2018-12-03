export type PlayState = boolean[];

export interface PlayAction {
  keyIndex: number;
  isPlaying: boolean;
}

export default function playStateReducer(state: PlayState, action: PlayAction) {
  const newState = state.slice();
  newState.splice(action.keyIndex, 1, action.isPlaying);
  return newState;
}
