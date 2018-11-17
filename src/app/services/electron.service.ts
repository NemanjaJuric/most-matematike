import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() { 
    if (this.isElectron()) {
      this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      this.webFrame = (window as any).require('electron').webFrame;
      this.remote = (window as any).require('electron').remote;
      this.childProcess = (window as any).require('child_process');
      this.fs = (window as any).require('fs');
    }
  }

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  isElectron() {
    return window && (window as any).process && (window as any).process.type;
  }

}
