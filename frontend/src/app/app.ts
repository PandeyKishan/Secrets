import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    @if (loadingService.isLoading()) {
      <div class="loading-bar"></div>
    } @else {
      <div class="main-container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" routerLink="/">
              <i class="fas fa-mask me-2"></i> Secrets
            </a>
            <div class="ms-auto d-flex align-items-center">
              @if (authService.isAuthenticated()) {
                <a routerLink="/profile" class="profile-link me-4 text-white">
                  <i class="fas fa-user-circle fa-2x"></i>
                </a>
                <button class="btn btn-danger btn-sm px-3 shadow-sm" (click)="onLogout()">
                  Logout
                </button>
              }
            </div>
          </div>
        </nav>
        <router-outlet />
      </div>
    }
  `,
  styles: [`
    .navbar-brand {
      font-family: 'Georgia', serif;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .profile-link {
      transition: transform 0.2s;
      display: inline-block;
      text-decoration: none;
    }
    .profile-link:hover {
      transform: scale(1.1);
    }
    .loading-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: linear-gradient(to right, #212529, #dc3545, #212529);
      background-size: 200% 100%;
      animation: loading 1.5s infinite linear;
      z-index: 9999;
    }
    @keyframes loading {
      from { background-position: 200% 0; }
      to { background-position: -200% 0; }
    }
  `],
})
export class App {
  constructor(
    public authService: AuthService, 
    public loadingService: LoadingService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.start();
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        this.loadingService.stop();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
