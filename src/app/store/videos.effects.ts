import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { IVideosState } from "./videos.reducers";
import { ApiService } from "src/app/services/api.service";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable()
export class VideosEffects {

  private dataFromStorage: IVideosState | undefined;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) { }  

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(authActions.loginRequest),
  //     switchMap((data: IRequestData) =>
  //       this.authService.loginUser(data).pipe(
  //       map(({ username, token }) => {
  //         this.authService.onLoggedIn(token);
  //         this.dataFromStorage = this.localStorageService.loadFromLocalStorage('formData');
  //         if (this.dataFromStorage) {
  //           this.store.dispatch(formBuilderActions.addFullFormData(this.dataFromStorage));
  //         }
  //         return authActions.loginSuccess({ username, token })
  //       }),
  //       catchError(error => of(authActions.loginError(error)))
  //     ))
  //   ))

}