import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(
    private _http: HttpClient
  ) { }

  get(url: string, params?: HttpParams) {
    return this._http.get(url, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  post(url: string, body?: any) {
    return this._http.post(url, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

}
