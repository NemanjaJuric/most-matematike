import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { TimerService } from 'src/app/services/timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private _quizService: QuizService,
    private _router: Router
  ) { }

  data = this._quizService.data;

  configLoaded: boolean = false;
  videoLoaded: boolean = false;

  @ViewChild('heading') heading: ElementRef;

  ngOnInit() {
    this._quizService.inHome(true);
    this._checkLoadedFiles();
  }

  ngOnDestroy(){
    this._quizService.inHome(false);
  }

  goToChooser(level: any) {
    this._quizService.setLevel(level);
    this._router.navigate(['game-chooser']);
  }

  private _checkLoadedFiles(){
    this.configLoaded = this._quizService.data ? true : false;
    this.videoLoaded = this._quizService.video ? true : false;
  }

}
