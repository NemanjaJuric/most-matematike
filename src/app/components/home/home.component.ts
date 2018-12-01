import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import { faExclamationTriangle, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private _quizService: QuizService,
    private _router: Router
  ) { }

  faExclamationTriangle = faExclamationTriangle;
  faCog = faCog;

  data: any;
  configLoaded: boolean = false;

  @ViewChild('heading') heading: ElementRef;

  ngOnInit() {
    this._quizService.inHome(true);
    this._getData();
    this._quizService.tempSetData();
  }

  private _getData() {
    this._quizService.getData()
      .subscribe(data => {
        this.data = data;
        this.configLoaded = this.data ? true : false;
      })
  }

  ngOnDestroy() {
    this._quizService.inHome(false);
  }

  goToChooser(level: any) {
    this._quizService.setLevel(level);
    this._router.navigate(['game-chooser']);
  }

}
