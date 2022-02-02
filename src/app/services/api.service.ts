import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from "src/environments/environment";
import { IVideosData } from "../store/store.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = environment.API_URL;
  private API_KEY = environment.API_KEY;

  constructor(
    private _http: HttpClient,  
    ) { }

  public getPopularVideos(query: string): Observable<any> {
    return this._http.get<any>(`${this.API_URL}?key=${this.API_KEY}&maxResults=1&type=video&part=snippet&q=${query}`)
  }
}
