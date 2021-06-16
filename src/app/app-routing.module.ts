import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pantais/home/home.component';
import {NotFoundComponent} from './pantais/not-found/not-found.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  //{path: '404', component: NotFoundComponent, redirectTo: '/404'},
  {path: '**', component: HomeComponent,
    data: {
      breadcrumb: 'Status Error',
      error: 404
    } 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
