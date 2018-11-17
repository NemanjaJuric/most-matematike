import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReadyGuard implements CanActivate {

  constructor(
    private _quizService: QuizService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._quizService.getData();
    return this._quizService.isReady()
  }
}
