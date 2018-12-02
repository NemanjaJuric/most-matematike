import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
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
    private _activatedRoute: ActivatedRoute,
    private _timerService: TimerService,
    private _sanitizer: DomSanitizer,
  ) { }

  faQuestionCircle = faQuestionCircle;

  @ViewChild('taskWrapper') taskWrapper: ElementRef
  @ViewChild('videoWrapper') videoWrapper: ElementRef

  game: any;
  private _gameSubs: Subscription;

  question: SafeHtml;
  answer: SafeHtml;
  renderedText: SafeHtml;
  private _isQuestionShown: boolean = false;

  video: any;
  videoSelected: boolean = false;
  hasVideo: boolean = false;
  videoSrc: any;

  ngOnInit() {
    this._quizService.inGame(true);
    this._getGame();
    this._hasVideo();
  }

  ngOnDestroy() {
    this._quizService.inGame(false);
    this._quizService.inTask(false);
    this._deselectAllTasks();
    this._timerService.stopTimer();
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
        this._isQuestionShown = true;
        this._quizService.inTask(true);
      } else {
        t.selected = false;
      }
    });
    this.videoSelected = false;
  }

  private _deselectAllTasks() {
    this.game.tasks.forEach(t => t.selected = false)
  }

  showAnswer() {
    if (this._isQuestionShown) {
      this.renderedText = this.answer;
      this._isQuestionShown = false;
      this._timerService.stopTimer();
      this._quizService.inTask(false);
    } else {
      this.renderedText = this.question;
      this._isQuestionShown = true;
    }
  }

  // VIDEO

  private _hasVideo() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.hasVideo = params && params.video == 'true';
    })
  }

  selectVideo() {
    this.videoSelected = true;
    this._timerService.stopTimer();
    this._deselectAllTasks();
    this._quizService.getVideo()
      .subscribe(video => {
        let url = URL.createObjectURL(video);
        let t = setTimeout(() => {
          this.videoWrapper.nativeElement.src = url;
          t = null;
        }, 0);
      })
  }

}