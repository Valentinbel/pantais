import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pantais/home/home.component';
import { NotFoundComponentComponent } from './pantais/not-found-component/not-found-component.component';




@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    NotFoundComponentComponent
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
