import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { IVideosState } from "./videos.reducers";
import { ApiService } from "src/app/services/api.service";
import { LocalStorageService } from "../services/local-storage.service";
import { CommonService } from "../services/common.service";

import * as videosActions from './videos.actions';
import { LocalStorageEnum } from "../enums/localStorage.enum";

@Injectable()
export class VideosEffects {

  private dataFromStorage: IVideosState | undefined;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    ) { }  

  video$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.videosRequest),
      mergeMap(() => 
        this.apiService.getPopularVideos('cat')
        .pipe(
          map(videos => {
            console.log(this.commonService.makeTableData(videos))
            videosActions.addVideosData(videos);
            this.localStorageService.saveToLocalStorage(LocalStorageEnum.videoData, videos);
          }),
          catchError(error => of(videosActions.videosRequestError(error))
          )
        )
      )
    )
  )
}