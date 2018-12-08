import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private _webApiService: WebApiService,
  ) { }

  private _data;
  private _data$: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _video;
  private _video$: ReplaySubject<any> = new ReplaySubject<any>(1);

  level: any;
  private _level$: ReplaySubject<any> = new ReplaySubject<any>(1);

  game: any;
  private _game$: ReplaySubject<any> = new ReplaySubject<any>(1);

  private _inGame$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _inHome$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _inTask$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  tempSetData() {
    this._webApiService.get('assets/config/configuration.json')
      .subscribe(data => {
        this.setData(JSON.stringify(data));
      })
  }

  setData(data: string) {
    this._data = JSON.parse(data);
    this._data$.next(this._data);
  }

  setPastYearData(url: string) {
    this._webApiService.get(url)
      .subscribe(data => {
        this.setData(JSON.stringify(data));
      })
  }

  getData() {
    this._data$.next(this._data);
    return this._data$.asObservable();
  }

  setVideo(arrayBuffer: ArrayBuffer) {
    this._video = new Blob([arrayBuffer]);
    this._video$.next(this._video);
  }

  getVideo() {
    return this._video$.asObservable();
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

  inGame(status: boolean) {
    this._inGame$.next(status);
  }

  isInGame() {
    return this._inGame$.asObservable();
  }

  inHome(status: boolean) {
    this._inHome$.next(status);
  }

  isInHome() {
    return this._inHome$.asObservable();
  }

  inTask(status: boolean){
    this._inTask$.next(status);
  }

  isInTask() {
    return this._inTask$.asObservable();
  }

  getPastYearsList() {
    return this._webApiService.get('assets/config/past-years/years.json')
      .pipe(
        map(res => res['years'])
      )
  }

}
