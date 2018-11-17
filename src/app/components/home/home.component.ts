import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { TimerService } from 'src/app/services/timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private _quizService: QuizService,
    private _timerService: TimerService,
    private _router: Router
  ) { }

  data = this._quizService.data;

  @ViewChild('heading') heading: ElementRef;

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  goToChooser(level: any) {
    this._quizService.setLevel(level);
    this._router.navigate(['game-chooser']);
  }

}
