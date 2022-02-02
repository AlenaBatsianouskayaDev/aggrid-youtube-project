import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { IVideosState } from "./videos.reducers";
import { ApiService } from "src/app/services/api.service";
import { LocalStorageService } from "../services/local-storage.service";

import * as videosActions from './videos.actions';
import { identifierName } from "@angular/compiler";

@Injectable()
export class VideosEffects {

  private dataFromStorage: IVideosState | undefined;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
  ) { }  

  video$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.videosRequest),
      mergeMap(() => this.apiService.getPopularVideos('cat')
        .pipe(
          map(videos => {
            
            videos = videos.items.map((item: any) => {
              console.log(item)
              return ({
                id: item[0].id.videoId,
                preview: item.snippet.thumbnails.default.url, 
                publishedOn: item.snippet.publishedAt,
                videoTitle: item.snippet.title,
                description: item.snippet.description,
              })
            })
            console.log(videos)
            videosActions.addVideosData(videos);
            this.localStorageService.saveToLocalStorage('videosData', videos);
          }),
          catchError(error => of(videosActions.videosRequestError(error))
          )
        )
      )
    )
  )
}