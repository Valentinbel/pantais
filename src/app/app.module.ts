import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pantais/home/home.component';
import { NotFoundComponent } from './pantais/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
