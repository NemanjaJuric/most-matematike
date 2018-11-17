import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() {}

  private _music = new Audio('assets/sounds/music.mp3');
  private _musicPlay: boolean = false;

  private _tick = new Audio('assets/sounds/tick.mp3');
  private _finish = new Audio('assets/sounds/finish.mp3');

  playMusic() {
    this._music.play();
    this._music.loop = true;
    this._musicPlay = true;
    this.setMusicVolume(0.1);
  }

  pauseMusic(){
    this._music.pause();
    this._musicPlay = false;
  }

  toogleMusic(){
    this._musicPlay ? this.pauseMusic() : this.playMusic();
  }

  setMusicVolume(volume: number){
    this._music.volume = volume;
  }

  playTick(){
    this._tick.play();
  }

  playFinish(){
    this._finish.play();
  }

}
