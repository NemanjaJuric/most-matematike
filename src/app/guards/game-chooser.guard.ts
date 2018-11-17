import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameChooserGuard implements CanActivate {

  constructor(
    private _quizService: QuizService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let canGo: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    this._quizService.getLevel()
      .subscribe(level => {
        if (level) {
          canGo.next(true);
        } else {
          this._router.navigate(['']);
          canGo.next(false);
        }
      })
    return canGo.asObservable();
  }

}
