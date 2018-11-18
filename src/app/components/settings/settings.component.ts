import { Component, OnInit } from '@angular/core';
import { faCogs, faFilm } from '@fortawesome/free-solid-svg-icons';
import { UploadFile, UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { QuizService } from 'src/app/services/quiz.service';
import { FileHelper } from 'src/app/helpers/file.helper';

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

  files: UploadFile[] = [];

  dataName: string = '';
  videoName: string = '';

  ngOnInit() {
  }

  dropped(event: UploadEvent, type: string) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (type === 'text') {
            this.dataName = file.name;
            let subs = FileHelper.readTextFile(file)
              .subscribe(config => {
                this._quizService.setData(config);
                subs.unsubscribe();
              })
          } else {
            this.videoName = file.name;
            let subs = FileHelper.readBinaryFile(file)
            .subscribe(videoBytes => {
              this._quizService.setVideo(videoBytes)
              subs.unsubscribe();
            })
          }
        });
      }
    }
  }

}
