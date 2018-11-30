import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { faQuestionCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { TaskHelper } from 'src/app/helpers/task.helper';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
})
export class AssociationsComponent implements OnInit, OnDestroy {

  constructor(
    private _quizService: QuizService,
    private _sanitizer: DomSanitizer,
  ) { }

  faQuestionCircle = faQuestionCircle;
  faArrowLeft = faArrowLeft;

  game: any;
  final: string = 'Коначно';
  showWindow: boolean = false;
  question: SafeHtml;
  answer: SafeHtml;
  renderedText: SafeHtml;
  private _isQuestionShown: boolean = false;

  ngOnInit() {
    this._getGame();
    this._quizService.inGame(true);
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
        });
        this.game = g;
      })
  }

  showQuestion(field) {
    if (!field.opened) {
      field.value = field.term;
      field.opened = true;
      this.question = this._sanitizer.bypassSecurityTrustHtml(TaskHelper.makeMathText(field.question));
      this.answer = this._sanitizer.bypassSecurityTrustHtml(TaskHelper.makeMathText(field.answer));
      this.renderedText = this.question;
      this._isQuestionShown = true;
      this.showWindow = true;
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
  }

  showAnswer() {
    if (this._isQuestionShown) {
      this.renderedText = this.answer;
      this._isQuestionShown = false;
    } else {
      this.renderedText = this.question;
      this._isQuestionShown = true;
    }
  }

}
