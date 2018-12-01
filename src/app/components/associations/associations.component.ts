import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { faQuestionCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { TaskHelper } from 'src/app/helpers/task.helper';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
})
export class AssociationsComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private _quizService: QuizService,
    private _sanitizer: DomSanitizer,
    private _timerService: TimerService
  ) { }

  faQuestionCircle = faQuestionCircle;
  faArrowLeft = faArrowLeft;

  game: any;
  final: string = 'Коначно';
  showWindow: boolean = false;
  question: SafeHtml;
  answer: SafeHtml;
  renderedText: SafeHtml;
  isQuestionShown: boolean = false;

  ngOnInit() {
    this._getGame();
    this._quizService.inGame(true);
  }

  ngAfterViewInit(){
    this._drawCanvas();
  }

  ngOnDestroy() {
    this._quizService.inGame(false);
  }

  private _getGame() {
    this._quizService.getGame()
      .subscribe(g => {
        g.columns.forEach(column => {
          column.value = column.name;
          column.fields.forEach(field => {
            field.value = field.name;
          });
          column.helps.forEach(help => {
            help.value = help.name;
          });
        });
        this.game = g;
      })
  }

  private _drawCanvas() {
    var c = document.getElementById("stalk") as HTMLCanvasElement;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    var ctx = c.getContext("2d");
    ctx.strokeStyle ='#009225';
    ctx.lineWidth = 0.02 * c.width;
    ctx.moveTo(0.14 * c.width, 0.35 * c.height);
    ctx.lineTo(0.2 * c.width, 1 * c.height);
    ctx.stroke();

    ctx.moveTo(0.39 * c.width, 0.35 * c.height);
    ctx.lineTo(0.4 * c.width, 1 * c.height);
    ctx.stroke();

    ctx.moveTo(0.64 * c.width, 0.35 * c.height);
    ctx.lineTo(0.6 * c.width, 1 * c.height);
    ctx.stroke();

    ctx.moveTo(0.89 * c.width, 0.35 * c.height);
    ctx.lineTo(0.8 * c.width, 1 * c.height);
    ctx.stroke();
  }

  showQuestion(field) {
    if (!field.opened) {
      field.value = field.term;
      field.opened = true;
      this.question = this._sanitizer.bypassSecurityTrustHtml(TaskHelper.makeMathText(field.question));
      this.answer = this._sanitizer.bypassSecurityTrustHtml(TaskHelper.makeMathText(field.answer));
      this.renderedText = this.question;
      this.isQuestionShown = true;
      this.showWindow = true;
      this._timerService.startTimer(this.game.time);
    } else {
      field.value = field.name;
      field.opened = false;
    }
  }

  showTerm(column) {
    if (!column.opened) {
      column.value = column.solution;
      column.opened = true;
    } else {
      column.value = column.name;
      column.opened = false;
    }
  }

  finalSolution() {
    this.final = this.game.solution;
  }

  showAssociations() {
    this.showWindow = false;
    this._timerService.stopTimer();
  }

  showAnswer() {
    if (this.isQuestionShown) {
      this.renderedText = this.answer;
      this.isQuestionShown = false;
    } else {
      this.renderedText = this.question;
      this.isQuestionShown = true;
    }
    this._timerService.stopTimer();
  }

  revealHelp(help){
    if(!help.opened){
      help.value = help.term;
      help.opened = true;
    }else{
      help.value = help.name;
      help.opened = false;
    }
  }

}
