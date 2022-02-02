import { Action, createReducer, on } from "@ngrx/store";

import * as videosActions from './videos.actions';
import { IVideosData } from "./store.interfaces";


export interface IVideosState {
  videosData: IVideosData,
}

export const initialState: IVideosState = {
  videosData: {
    etag: '',
    items: [],
    kind: '',
    nextPageToken: '',
    pageInfo: {
      totalResults: 0, 
      resultsPerPage: 0
    },
    regionCode: '',
  },
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