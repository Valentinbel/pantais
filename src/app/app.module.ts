import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';

//import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from "@angular/common/http";
//import { CommonModule } from '@angular/common';

import { YouTubePlayerModule } from "@angular/youtube-player";
//import reframe from './../reframe.js';
 import { NgxAudioPlayerModule } from 'ngx-audio-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pantais/home/home.component';
import { NotFoundComponent } from './pantais/not-found/not-found.component';
import { MagComponent } from './pantais/mag/mag.component';
import { SnippetComponent } from './pantais/snippet/snippet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusicModule } from './music/music.module'

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    NotFoundComponent, 
    MagComponent,
    SnippetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    DragDropModule, 
    YouTubePlayerModule, 
    BrowserAnimationsModule, 
    MusicModule,
    NgxAudioPlayerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
