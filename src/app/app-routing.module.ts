import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { GameChooserComponent } from './components/game-chooser/game-chooser.component';
import { GameChooserGuard } from './guards/game-chooser.guard';
import { QuestionsAndAnswersComponent } from './components/questions-and-answers/questions-and-answers.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VideoQuestionsComponent } from './components/video-questions/video-questions.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'game-chooser',
        component: GameChooserComponent,
        canActivate: [GameChooserGuard]
      },
      {
        path: 'questions-answers',
        component: QuestionsAndAnswersComponent,
        canActivate: [GameChooserGuard]
      },
      {
        path: 'video-questions',
        component: VideoQuestionsComponent,
        canActivate: [GameChooserGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
