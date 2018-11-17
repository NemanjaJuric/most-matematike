import { Component, OnInit } from '@angular/core';
import { faWindowMaximize, faWindowMinimize, faMusic, faHome, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from 'src/app/services/electron.service';
import { SoundService } from 'src/app/services/sound.service';
import { TimerService } from 'src/app/services/timer.service';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {

  constructor(
    private _electronService: ElectronService,
    private _soundService: SoundService,
    private _timerService: TimerService,
    private _router: Router,
    private _quizService: QuizService
  ) { }

  faWindowMaximize = faWindowMaximize;
  faWindowMinimize = faWindowMinimize;
  faMusic = faMusic;
  faHome = faHome;
  faHandPointUp = faHandPointUp;

  fullScreenFlag: boolean = false;

  loaderWidth: number = 0;
  loaderColor: string = '#FFC20E';
  timer: number;

  isInGame: boolean = false;

  ngOnInit() {
    this._getLoaderWidth();
    this._getLoaderColor();
    this._getTimer();
    this._checkIsInGame();
  }

  fullScreen() {
    this.fullScreenFlag = !this.fullScreenFlag;
    if (this._electronService.isElectron()) {
      this._electronService.ipcRenderer.send('full-screen', this.fullScreenFlag)
    } else {
      if (this.fullScreenFlag) {
        // now comes party :D
        let docElm = document.documentElement;
        if ((docElm as any).requestFullscreen) {
          (docElm as any).requestFullscreen();
        } else if ((docElm as any).mozRequestFullScreen) {
          (docElm as any).mozRequestFullScreen();
        } else if ((docElm as any).webkitRequestFullScreen) {
          (docElm as any).webkitRequestFullScreen();
        } else if ((docElm as any).msRequestFullscreen) {
          (docElm as any).msRequestFullscreen();
        }
      } else {
        if ((document as any).exitFullscreen) {
          (document as any).exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    }
  }

  toggleMusic() {
    this._soundService.toogleMusic();
  }

  private _getLoaderWidth() {
    this._timerService.getLoaderWidth()
      .subscribe(w => {
        this.loaderWidth = w;
      })
  }

  private _getLoaderColor() {
    this._timerService.getLoaderColor()
      .subscribe(c => {
        this.loaderColor = c;
      })
  }

  private _getTimer(){
    this._timerService.getTimer()
    .subscribe(timer => {
      this.timer = timer;
    })
  }

  goHome(){
    this._router.navigate([''])
  }

  goChooser(){
    this._router.navigate(['game-chooser'])
  }

  private _checkIsInGame(){
    this._quizService.isInGame()
    .subscribe(inGame => {
      this.isInGame = inGame;
    })
  }

}
