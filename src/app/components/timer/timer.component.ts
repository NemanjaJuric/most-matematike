import { Component, OnInit } from '@angular/core';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit {

  constructor(
    private _soundService: SoundService
  ) { }

  time = new Date(2019, 0, 0, 0, 0, 0, 0);
  intervalFn = null;

  ngOnInit() {
  }

  start() {
    this.intervalFn = setInterval(() => {
      if (this.time.getHours() === 0 && this.time.getMinutes() === 0 && this.time.getSeconds() === 0) {
        this.stop();
        this.ring();
        return;
      }
      let ms = this.time.getTime()
      ms -= 1000;
      this.time = new Date(ms);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalFn);
  }

  restart() {
    clearInterval(this.intervalFn);
    this.time = new Date(0, 0, 0, 0, 0, 0, 0);
  }

  ring(){
    this._soundService.playFinish();
  }

}
