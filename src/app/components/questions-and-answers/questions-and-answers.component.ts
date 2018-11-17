import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/services/timer.service';
import { TaskHelper } from 'src/app/helpers/task.helper';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-questions-and-answers',
  templateUrl: './questions-and-answers.component.html',
})
export class QuestionsAndAnswersComponent implements OnInit, OnDestroy {

  constructor(
    private _quizService: QuizService,
    private _router: Router,
    private _timerService: TimerService,
    private _sanitizer: DomSanitizer
  ) { }

  faQuestionCircle = faQuestionCircle;

  @ViewChild('taskWrapper') taskWrapper: ElementRef

  game: any;
  private _gameSubs: Subscription;

  question: SafeHtml;
  answer: SafeHtml;
  renderedText: SafeHtml;

  ngOnInit() {
    this._quizService.inGame(true);
    this._getGame();
  }

  ngOnDestroy() {
    this._quizService.inGame(false);
    if (this._gameSubs) {
      this._gameSubs.unsubscribe();
    }
  }

  private _getGame() {
    this._gameSubs = this._quizService.getGame()
      .subscribe(game => {
        if (game) {
          this.game = game;
        } else {
          this._router.navigate(['']);
        }
      })
  }

  selectTask(task: any) {
    this.game.tasks.forEach(t => {
      if (t.id === task.id) {
        t.selected = true;
        this.question = this._sanitizer.bypassSecurityTrustHtml(TaskHelper.makeMathText(t.question));
        this.answer = this._sanitizer.bypassSecurityTrustHtml(TaskHelper.makeMathText(t.answer));
        this.renderedText = this.question;
        this._timerService.startTimer(t.time);
      } else {
        t.selected = false;
      }
    });
  }

  showAnswer(){
    this.renderedText = this.answer;
  }

}