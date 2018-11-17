import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/services/timer.service';
declare var katex;

@Component({
  selector: 'app-questions-and-answers',
  templateUrl: './questions-and-answers.component.html',
})
export class QuestionsAndAnswersComponent implements OnInit, OnDestroy {

  constructor(
    private _quizService: QuizService,
    private _router: Router,
    private _timerService: TimerService
  ) { }

  @ViewChild('taskWrapper') taskWrapper: ElementRef

  game: any;
  private _gameSubs: Subscription;

  ngOnInit() {
    this._quizService.inGame(true);
    this._getGame();
  }

  ngOnDestroy(){
    this._quizService.inGame(false);
    if(this._gameSubs){
      this._gameSubs.unsubscribe();
    }
  }

  private _getGame(){
    this._gameSubs = this._quizService.getGame()
    .subscribe(game => {
      if(game){
        this.game = game;
      }else{
        this._router.navigate(['']);
      }
    })
  }

  timer(seconds: number){
    this._timerService.startTimer(seconds);
  }

  private _showTask(task) {
    let text = task.text;
    for(let prop in task){
      if(prop !== 'text'){
        let strForReplace = '${' + prop + '}';
        let strToReplace = katex.renderToString(task[prop])
        text = text.replace(strForReplace, strToReplace);
      }
    }
    this.taskWrapper.nativeElement.innerHTML = text;
  }

}