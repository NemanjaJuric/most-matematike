import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private _webApiService: WebApiService
  ) { }

  data;
  private _ready$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  level: any;
  private _level$: ReplaySubject<any> = new ReplaySubject<any>(1);

  game: any;
  private _game$: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _inGame$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  getData() {
    this._webApiService.get('assets/data/data.json')
      .subscribe(data => {
        this.data = data;
        this._ready$.next(true);
      })
  }

  isReady() {
    return this._ready$.asObservable();
  }

  setLevel(level: any) {
    this.level = level;
    this._level$.next(this.level);
  }

  getLevel(): Observable<any> {
    this._level$.next(this.level);
    return this._level$.asObservable();
  }

  setGame(game: any) {
    this.game = game;
    this._game$.next(this.game);
  }

  getGame(): Observable<any> {
    return this._game$.asObservable();
  }

  inGame(status: boolean){
    this._inGame$.next(status);
  }

  isInGame(){
    return this._inGame$.asObservable();
  }

}
