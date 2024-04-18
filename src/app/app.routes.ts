import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./utilities/guards/auth.guard";
import {DetailsComponent} from "./components/details/details.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'details', children: [
      {path: ':id', component: DetailsComponent, canActivate: [authGuard]}
    ]}
];
