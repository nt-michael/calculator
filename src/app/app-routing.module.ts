import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import { PostComponent } from './post/post.component';
import { DetailComponent } from './detail/detail.component';
import { CalculatorComponent } from './calculator/calculator.component';
//import { homedir } from 'os';

const routes: Routes = [
  //{path:'', component: HomeComponent},
  {path:'', component: CalculatorComponent},
  {path:'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'posts', component: PostComponent},
  {path: 'posts/:id', component: DetailComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }