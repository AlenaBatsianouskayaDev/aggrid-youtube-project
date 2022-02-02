import { Injectable } from '@angular/core';
import { IResponseVideoData } from './../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveToLocalStorage(dataName: string, data: IResponseVideoData): void {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(dataName, serializedData);
  }

  public loadFromLocalStorage(dataName:string): IResponseVideoData | undefined{
    const data = localStorage.getItem(dataName);
    return data === null ? undefined : JSON.parse(data); 
  }

  public removeFromLocalStorage(dataName: string):void {
    localStorage.removeItem(dataName);
  }
}
