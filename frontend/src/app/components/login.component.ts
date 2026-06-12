import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5 text-center">
          <i class="fas fa-lock fa-6x mb-4 text-dark"></i>
          <h1 class="display-4 mb-5">Welcome Back</h1>
          
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card border-0 shadow-sm p-4 mb-5" style="border-radius: 20px;">
                <form (ngSubmit)="onLogin()">
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control bg-light border-0" id="email" name="username" [(ngModel)]="credentials.username" placeholder="name@example.com" required>
                    <label for="email">Email address</label>
                  </div>
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control bg-light border-0" id="password" name="password" [(ngModel)]="credentials.password" placeholder="Password" required>
                    <label for="password">Password</label>
                  </div>
                  <button type="submit" class="btn btn-dark btn-lg w-100 py-3 mb-3">Login</button>
                  <a class="btn btn-outline-google w-100 py-3 border" href="http://localhost:8080/oauth2/authorization/google" role="button">
                    <i class="fab fa-google me-2"></i> Sign In with Google
                  </a>
                </form>
              </div>
              
              <div class="action-buttons">
                <p class="text-muted fs-5">Don't have an account? <a routerLink="/register" class="text-dark fw-bold text-decoration-none">Register</a></p>
                <a class="btn btn-link text-dark mt-3 fs-5 text-decoration-none fw-bold" routerLink="/">
                  <i class="fas fa-home me-2"></i>Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal Overlay -->
    @if (errorMessage()) {
      <div class="modal-overlay">
        <div class="modal-card shadow-lg animate-pop">
          <i class="fas fa-exclamation-circle fa-4x text-danger mb-4"></i>
          <h2 class="mb-3">Login Failed</h2>
          <p class="lead mb-4">{{ errorMessage() }}</p>
          <button class="btn btn-dark btn-lg px-5 rounded-pill" (click)="errorMessage.set(null)">
            Try Again
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    h1, h2 { font-family: 'Georgia', serif; }
    .form-control:focus { box-shadow: none; border: 1px solid #212529; }
    .btn-outline-google { 
      color: #fff; 
      background-color: #dc3545; 
      border-color: #dc3545;
      transition: background-color 0.2s, border-color 0.2s, transform 0.2s;
    }
    .btn-outline-google:hover { 
      background-color: #bb2d3b; 
      border-color: #b02a37;
      color: #fff;
      transform: translateY(-2px);
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    .modal-card {
      background: white;
      padding: 3rem;
      border-radius: 30px;
      text-align: center;
      max-width: 450px;
      width: 90%;
    }
    .animate-pop {
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    @keyframes popIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  errorMessage = signal<string | null>(null);
  googleAuthUrl = `${environment.apiUrl.replace('/api', '')}/oauth2/authorization/google`;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const username = params['username'];
      const error = params['error'];

      if (token && username) {
        this.authService.saveSession({ token, username });
        this.router.navigate(['/']);
      } else if (error) {
        this.errorMessage.set('Google sign-in failed. Please ensure you have an account or try again.');
      }
    });
  }

  onLogin() {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage.set('Both email and password are required to unlock your secrets!');
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Login error full object:', err);
        
        // If it's a known auth failure (401, 403, 404) OR if it's a generic error but we are sure it's a credentials issue
        if (err.status === 401 || err.status === 403 || err.status === 404 || (err.error && err.error.message)) {
          this.errorMessage.set('This user is not allowed to access top-secret stuff! Check your password or get registered .');
        } else {
          // Fallback for network errors or server crashes
          this.errorMessage.set('Our servers are taking a nap... Please check your connection or try again later.');
        }
      }
    });
  }
}
