import { Injectable } from '@angular/core';
import { IVideosState } from '../store/videos.reducers';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveToLocalStorage(dataName: string, data: IVideosState): void {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(dataName, serializedData);
  }

  public loadFromLocalStorage(dataName:string): IVideosState | undefined{
    const data = localStorage.getItem(dataName);
    return data === null ? undefined : JSON.parse(data); 
  }

  public removeFromLocalStorage(dataName: string):void {
    localStorage.removeItem(dataName);
  }
}
