import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = `https://www.googleapis.com/youtube/v3/search`;
  private API_KEY = `AIzaSyDHom4CDme-A8q9RzytDP9aeCvfUqlZ38w`;

  constructor(
    private _http: HttpClient,  
    ) { }

  public getQuery(query: string): Observable<any> {
    return this._http.get<any>(`${this.API_URL}?key=${this.API_KEY}&maxResults=&type=video&part=snippet&q=${query}`)
  }
}
