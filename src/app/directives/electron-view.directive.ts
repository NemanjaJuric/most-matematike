import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ElectronService } from '../services/electron.service';

@Directive({
  selector: '[electron-view]'
})
export class ElectronViewDirective {

  constructor(
    private _el: ElementRef,
    private _electronService: ElectronService,
    private _renderer: Renderer2
  ) { 
    this._showHide();
  }

  private _showHide(){
    if(!this._electronService.isElectron()){
      let parent = this._el.nativeElement.parentElement;
      this._renderer.removeChild(parent, this._el.nativeElement);
    }
  }

}
