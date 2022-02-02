import { createAction, props } from '@ngrx/store';
import { IVideosData } from './store.interfaces';


export const videosRequest = createAction(
  '[VIDEOS] videosRequest'
);

export const addVideosData = createAction(
  '[VIDEOS] addVideosData',
  props< IVideosData >()
);

export const videosRequestError = createAction(
  '[VIDEOS] videosRequestError',
  props< any >()
);
