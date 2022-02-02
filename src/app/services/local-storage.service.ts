import { Injectable } from '@angular/core';
import { IVideosData } from '../store/store.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveToLocalStorage(dataName: string, data: IVideosData): void {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(dataName, serializedData);
  }

  public loadFromLocalStorage(dataName:string): IVideosData | undefined{
    const data = localStorage.getItem(dataName);
    return data === null ? undefined : JSON.parse(data); 
  }

  public removeFromLocalStorage(dataName: string):void {
    localStorage.removeItem(dataName);
  }
}
