import { createAction, props } from '@ngrx/store';
import { IVideoData } from './store.interfaces';

export const addVideosData = createAction(
  '[Videos] addVideosData',
  props< IVideoData >()
);