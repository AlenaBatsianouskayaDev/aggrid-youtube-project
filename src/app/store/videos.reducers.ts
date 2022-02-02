import { Action, createReducer, on } from "@ngrx/store";

import * as videosActions from './videos.actions';
import { IVideoData } from "./store.interfaces";


export interface IVideosState {
  videosData: IVideoData[]
}

export const initialState: IVideosState = {
  videosData: []
}

export function videosReducer(state: IVideosState | undefined, action: Action): IVideosState {
  return reducer(state, action);
}

const reducer = createReducer<IVideosState>(
  initialState,

  on(videosActions.addVideosData, (state, payload) => ({
    ...state,
    videosData: [...state.videosData, {...payload}]
  }))
)