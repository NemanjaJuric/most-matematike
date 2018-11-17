import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { TimerService } from 'src/app/services/timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private _quizService: QuizService,
    private _timerService: TimerService,
    private _router: Router
  ) { }

  data = this._quizService.data;

  ngOnInit() {
  }

  testTimer(seconds) {
    this._timerService.startTimer(seconds);
  }

  goToChooser(level: any) {
    this._quizService.setLevel(level);
    this._router.navigate(['game-chooser']);
  }

}
