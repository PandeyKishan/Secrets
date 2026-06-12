import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { SecretsComponent } from './components/secrets.component';
import { SubmitComponent } from './components/submit.component';
import { ProfileComponent } from './components/profile.component';
import { authGuard, guestGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'secrets', component: SecretsComponent, canActivate: [authGuard] },
  { path: 'submit', component: SubmitComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
