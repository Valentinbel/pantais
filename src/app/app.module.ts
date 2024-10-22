import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pantais/home/home.component';
import { NotFoundComponent } from './pantais/not-found/not-found.component';
import { SnippetComponent } from './pantais/snippet/snippet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusicModule } from './music/music.module';
import { FlipBookModule } from '@labsforge/flipbook';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SnippetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    YouTubePlayerModule,
    BrowserAnimationsModule,
    MusicModule,
    NgxAudioPlayerModule,
    FlipBookModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
