import { createAction, props } from '@ngrx/store';
import { IVideoData, IErrorData } from './store.interfaces';


export const videosRequest = createAction(
  '[VIDEOS] addVideosData'
);

export const videosRequestSuccess = createAction(
  '[VIDEOS] addVideosData',
  props<IVideoData>()
);

export const videosRequestError = createAction(
  '[VIDEOS] addVideosData',
  props<IErrorData>()
);

export const addVideosData = createAction(
  '[VIDEOS] addVideosData',
  props< IVideoData>()
);