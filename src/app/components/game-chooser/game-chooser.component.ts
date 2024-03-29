import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-game-chooser',
  templateUrl: './game-chooser.component.html',
})
export class GameChooserComponent implements OnInit {

  constructor(
    private _quizService: QuizService,
    private _router: Router,
    private _sanitizer: DomSanitizer,
  ) { }

  level: any;
  description: SafeHtml;

  ngOnInit() {
    this._getLevel();
  }

  private _getLevel() {
    this._quizService.getLevel()
      .subscribe(l => {
        this.level = l;
      })
  }

  showDescription(game: any) {
    this.description = this._sanitizer.bypassSecurityTrustHtml(game.description);
  }

  enterGame(game: any) {
    this._quizService.setGame(game);
    this._router.navigate([game.route], { queryParams: { video: game.video } });
  }

}
