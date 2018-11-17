import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    let val = null;
    if (typeof (value) === 'object') {
      val = JSON.stringify(value)
    } else {
      val = value;
    }
    localStorage.setItem(key, val);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

}
