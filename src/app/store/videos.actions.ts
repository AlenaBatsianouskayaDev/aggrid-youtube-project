import { createAction, props } from '@ngrx/store';

import { IResponseVideoData } from './../interfaces/interfaces';
import { ActionsEnum } from '../enums/actions.enum';

export const videosRequest = createAction(
  ActionsEnum.videosRequest
);

export const addVideosData = createAction(
  ActionsEnum.videosRequestSuccess,
  props< IResponseVideoData >()
);

export const videosRequestError = createAction(
  ActionsEnum.videosRequestError,
  props< any >()
);
