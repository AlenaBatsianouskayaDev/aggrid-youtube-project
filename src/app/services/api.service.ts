import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = environment.API_URL;
  private API_KEY = environment.API_URL;

  constructor(
    private _http: HttpClient,  
    ) { }

  public getPopularVideos(query: string): Observable<any> {
    return this._http.get<any>(`${this.API_URL}?key=${this.API_KEY}&maxResults=&type=video&part=snippet&q=${query}`)
  }
}
