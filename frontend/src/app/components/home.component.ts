import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <div class="container-fluid py-5">
          <i class="fas fa-key fa-6x mb-4 text-dark"></i>
          <h1 class="display-3 mb-3">Secrets</h1>
          <p class="lead mb-2">Don't keep your secrets, share them anonymously!</p>
          <p class="text-danger small mb-5 italic fw-bold">"Once whispered, they can never be unheard. Choose your words carefully."</p>
          
          <div class="action-buttons pt-4">
            @if (!authService.isAuthenticated()) {
              <a class="btn btn-outline-dark btn-lg m-2 px-5" routerLink="/register" role="button">Register</a>
              <a class="btn btn-dark btn-lg m-2 px-5" routerLink="/login" role="button">Login</a>
            } @else {
              <a class="btn btn-dark btn-lg m-2 px-5" routerLink="/secrets" role="button">View Secrets</a>
              <a class="btn btn-outline-dark btn-lg m-2 px-5" routerLink="/submit" role="button">Submit a Secret</a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .display-3 {
      font-family: 'Georgia', serif;
      font-weight: bold;
    }
  `]
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
