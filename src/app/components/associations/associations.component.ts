import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { faColumns } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
})
export class AssociationsComponent implements OnInit {

  constructor(
    private _quizService: QuizService
  ) { }

  game: any;
  final: string = 'Коначно';

  ngOnInit() {
    this._getGame();
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
    field.value = field.term;
    field.opened = true;
  }

  showTerm(column){
    column.value = column.solution;
    column.opened = true;
  }

  finalSolution(){
    this.final = this.game.solution;
  }

}
