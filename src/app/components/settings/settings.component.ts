import { Component, OnInit } from '@angular/core';
import { faCogs, faFilm } from '@fortawesome/free-solid-svg-icons';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  constructor(
    private _quizService: QuizService
  ) { }

  faCogs = faCogs;
  faFilm = faFilm;

  configurationFile: any;
  video: any;

  ngOnInit() {
  }

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent, type: string) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (type === 'text') {
            this.configurationFile = file;
            this._readTextFile(this.configurationFile)
          } else {
            this.video = file;
            this._readBinaryFile(this.video);
          }
        });
      }
    }
  }

  private _readTextFile(file: any) {
    var reader = new FileReader();
    reader.onload = () => {
      var config = reader.result as string;
      this._quizService.setData(config);
    };
    reader.readAsText(file);
  }

  private _readBinaryFile(file: any) {
    var reader = new FileReader();
    reader.onload = () => {
      var arrayBuffer = reader.result as ArrayBuffer;
      this._makeVideo(arrayBuffer)
    };
    reader.readAsArrayBuffer(file);
  }

  private _makeVideo(arrayBuffer: ArrayBuffer) {
    let blob = new Blob([arrayBuffer]);
    var videoEl = document.getElementById('video') as HTMLVideoElement;
    var url = URL.createObjectURL(blob);
    videoEl.src = url;
    videoEl.autoplay = true;
    
  }

}
