import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
})
export class AssociationsComponent implements OnInit {

  constructor(
    private _quizService: QuizService
  ) { }

  game: any;

  ngOnInit() {
    this._getGame();
  }

  private _getGame(){
    this._quizService.getGame()
    .subscribe(g => {
      this.game = g;
    })
  }

}
