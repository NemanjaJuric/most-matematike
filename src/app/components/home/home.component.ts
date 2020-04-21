import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import { faExclamationTriangle, faCog } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

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
  private _dataSubs: Subscription;
  configLoaded: boolean = false;

  @ViewChild('heading') heading: ElementRef;

  ngOnInit() {
    this._quizService.inHome(true);
    this._getData();

  }

  ngOnDestroy() {
    this._quizService.inHome(false);
    if (this._dataSubs) {
      this._dataSubs.unsubscribe();
    }
  }

  private _getData() {
    this._dataSubs = this._quizService.getData()
      .subscribe(data => {
        this.data = data;
        this.configLoaded = this.data ? true : false;
        if (!this.data) {
          this._quizService.tempSetData();
        }
      })
  }

  goToChooser(level: any) {
    this._quizService.setLevel(level);
    this._router.navigate(['game-chooser']);
  }

  downloadManual() {
    const element = document.createElement('a');
    element.setAttribute('href', 'assets/documentation/uputstvo.pdf');
    element.setAttribute('download', 'uputstvo.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
