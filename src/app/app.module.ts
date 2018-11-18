import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectronService } from './services/electron.service';
import { ElectronViewDirective } from './directives/electron-view.directive';
import { WebApiService } from './services/web-api.service';
import { LocalStorageService } from './services/local-storage.service';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WebviewDirective } from './directives/webview.directive';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { QuizService } from './services/quiz.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SoundService } from './services/sound.service';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TimerService } from './services/timer.service';
import { ParticlesModule } from 'angular-particle';
import { GameChooserComponent } from './components/game-chooser/game-chooser.component';
import { GameChooserGuard } from './guards/game-chooser.guard';
import { QuestionsAndAnswersComponent } from './components/questions-and-answers/questions-and-answers.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FileDropModule } from 'ngx-file-drop';
import { AssociationsComponent } from './components/associations/associations.component';

@NgModule({
  declarations: [
    AppComponent,
    ElectronViewDirective,
    WebviewDirective,
    HomeComponent,
    MainComponent,
    NavigationComponent,
    GameChooserComponent,
    QuestionsAndAnswersComponent,
    SettingsComponent,
    AssociationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    LoadingBarModule.forRoot(),
    ParticlesModule,
    FileDropModule
  ],
  providers: [
    ElectronService,
    WebApiService,
    LocalStorageService,
    QuizService,
    SoundService,
    TimerService,
    GameChooserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
