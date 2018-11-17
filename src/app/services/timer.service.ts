import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subject, Subscription, Observable, interval, timer } from 'rxjs';
import { SoundService } from './sound.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private _soundService: SoundService
  ) { }

  private _startingTime: number;
  private _timer: Observable<number>;
  private _timerSubs: Subscription;
  private _color1: string = '#FFC20E';
  private _color2: string = '#df2b2b';
  private _width$: Subject<number> = new Subject<number>();
  private _color$: Subject<string> = new Subject<string>();
  private _timer$: Subject<number> = new Subject<number>();

  startTimer(seconds: number) {
    this._startingTime = seconds;
    this._timer = timer(0, 1000);
    this._updateLoader();
  }

  private _updateLoader() {
    if (this._timerSubs) {
      this._timerSubs.unsubscribe();
    }
    this._timerSubs = this._timer.subscribe(seconds => {
      if (this._startingTime - seconds >= 0) {
        let warningTime = this._startingTime / 3;
        warningTime = warningTime > 10 ? 10 : warningTime;
        if (this._startingTime - seconds > warningTime) {
          this._color$.next(this._color1);
        } else {
          this._color$.next(this._color2);
          this._soundService.playTick();
        }
        let value = (seconds / this._startingTime) * 100;
        this._width$.next(value);
        this._timer$.next(this._startingTime - seconds);
      } else {
        this._soundService.playFinish();
        this._width$.next(0);
        this._timer$.next(null);
        this._timerSubs.unsubscribe();
      }
    })
  }

  stopTimer() {
    this._width$.next(0);
    this._timer$.next(null);
    if (this._timerSubs) {
      this._timerSubs.unsubscribe();
    }
  }

  getLoaderWidth(): Observable<number> {
    return this._width$.asObservable();
  }

  getLoaderColor(): Observable<string> {
    return this._color$.asObservable();
  }

  getTimer(): Observable<number> {
    return this._timer$.asObservable();
  }

}
