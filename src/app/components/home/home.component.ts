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

  data: any;
  configLoaded: boolean = true;
  videoLoaded: boolean = true;

  @ViewChild('heading') heading: ElementRef;

  ngOnInit() {
    this._quizService.inHome(true);
    this._getData();
    this._getVideo();
    this._quizService.tempSetData();
  }

  private _getData() {
    this._quizService.getData()
      .subscribe(data => {
        this.data = data;
        this.configLoaded = this.data ? true : false;
      })
  }

  private _getVideo(){
    this._quizService.getVideo()
    .subscribe(video => {
      this.videoLoaded = video ? true : false;
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
