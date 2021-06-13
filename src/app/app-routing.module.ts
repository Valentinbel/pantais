import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pantais/home/home.component';
import {NotFoundComponentComponent} from './pantais/not-found-component/not-found-component.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '404', component: NotFoundComponentComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
