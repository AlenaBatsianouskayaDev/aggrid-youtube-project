import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = `https://www.googleapis.com/youtube/v3/search`;
  private API_KEY = `AIzaSyBNh5yhIx6G1vcj2PJEoBBhRS_zRtg1mzw`;

  constructor(
    private _http: HttpClient,  
    ) { }

  public getQuery(query: string): Observable<any> {
    return this._http.get<any>(`${this.API_URL}?key=${this.API_KEY}&maxResults=50&type=video&part=snippet&q=${query}`)
  }
}
