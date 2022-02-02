import { Action, createReducer, on } from "@ngrx/store";

import * as videosActions from './videos.actions';
import { IResponseVideoData, ITableData } from "./../interfaces/interfaces";


export interface IVideosState {
  videosData: ITableData [],
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
    videosData: { ...state.videosData, ...payload}
    })
  ),
  on(videosActions.videosRequestError, (state, payload) => ({
      ...state, 
    }),
  )
)