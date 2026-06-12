import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5 text-center">
          <i class="fas fa-user-plus fa-6x mb-4 text-dark"></i>
          <h1 class="display-4 mb-5">Join the Community</h1>
          
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card border-0 shadow-sm p-4 mb-5" style="border-radius: 20px;">
                <form (ngSubmit)="onRequestOtp()">
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control bg-light border-0" id="email" name="username" [(ngModel)]="user.username" placeholder="name@example.com" required>
                    <label for="email">Email address</label>
                  </div>
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control bg-light border-0" id="password" name="password" [(ngModel)]="user.password" placeholder="Password" required>
                    <label for="password">Password</label>
                  </div>
                  <button type="submit" class="btn btn-dark btn-lg w-100 py-3 mb-3">Register</button>
                  <a class="btn btn-outline-google w-100 py-3 border" href="http://localhost:8080/oauth2/authorization/google" role="button">
                    <i class="fab fa-google me-2"></i> Sign Up with Google
                  </a>
                </form>
              </div>
              
              <div class="action-buttons">
                <p class="text-muted fs-5">Already have an account? <a routerLink="/login" class="text-dark fw-bold text-decoration-none">Login</a></p>
                <a class="btn btn-link text-dark mt-3 fs-5 text-decoration-none fw-bold" routerLink="/">
                  <i class="fas fa-home me-2"></i>Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- OTP Modal Overlay -->
    @if (showOtpModal()) {
      <div class="modal-overlay">
        <div class="modal-card shadow-lg animate-pop">
          <i class="fas fa-envelope-open-text fa-4x text-primary mb-4"></i>
          <h2 class="mb-3">Verify Email</h2>
          <p class="lead mb-4">We've sent a 4-digit code to <strong>{{ user.username }}</strong></p>
          
          <div class="otp-input-container mb-4">
            <input 
              type="text" 
              class="form-control form-control-lg text-center fw-bold fs-2 tracking-widest" 
              [(ngModel)]="otp" 
              placeholder="0000" 
              maxLength="4">
          </div>

          <button class="btn btn-dark btn-lg w-100 rounded-pill mb-3" (click)="onVerifyOtp()">
            Verify & Register
          </button>
          
          <p class="text-muted small">
            Didn't receive it? 
            <button class="btn btn-link p-0 small text-decoration-none" (click)="onRequestOtp()" [disabled]="resendDisabled()">
              {{ resendDisabled() ? 'Wait a moment...' : 'Resend Code' }}
            </button>
          </p>
        </div>
      </div>
    }

    <!-- Success Modal Overlay -->
    @if (showSuccessModal()) {
      <div class="modal-overlay">
        <div class="modal-card shadow-lg animate-pop">
          <i class="fas fa-user-check fa-4x text-success mb-4"></i>
          <h2 class="mb-3">Welcome!</h2>
          <p class="lead mb-4">Registration successful. You can now start sharing your secrets!</p>
          <button class="btn btn-dark btn-lg px-5 rounded-pill" (click)="closeSuccessModal()">
            Go to Login
          </button>
        </div>
      </div>
    }

    <!-- Error Modal Overlay -->
    @if (errorMessage()) {
      <div class="modal-overlay">
        <div class="modal-card shadow-lg animate-pop">
          <i class="fas fa-exclamation-circle fa-4x text-danger mb-4"></i>
          <h2 class="mb-3">Failed</h2>
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
    .tracking-widest { letter-spacing: 0.5rem; }

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
export class RegisterComponent {
  user = { username: '', password: '' };
  otp = '';
  errorMessage = signal<string | null>(null);
  showSuccessModal = signal(false);
  showOtpModal = signal(false);
  resendDisabled = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  onRequestOtp() {
    if (!this.user.username || !this.user.password) {
      this.errorMessage.set('Both email and password are required to join the community!');
      return;
    }

    this.authService.requestOtp(this.user.username).subscribe({
      next: () => {
        this.showOtpModal.set(true);
        // Temporary disable resend to prevent spam
        this.resendDisabled.set(true);
        setTimeout(() => this.resendDisabled.set(false), 10000);
      },
      error: (err) => {
        console.error('OTP request error:', err);
        if (err.status === 400) {
          this.errorMessage.set('Email already taken or invalid. Please check and try again.');
        } else {
          this.errorMessage.set('Could not send verification code. Please try again later.');
        }
      }
    });
  }

  onVerifyOtp() {
    if (!this.otp || this.otp.length !== 4) {
      alert('Please enter a valid 4-digit code.');
      return;
    }

    this.authService.register(this.user, this.otp).subscribe({
      next: () => {
        this.showOtpModal.set(false);
        this.showSuccessModal.set(true);
      },
      error: (err) => {
        console.error('Registration error:', err);
        // Don't close OTP modal on error so they can try again
        if (err.status === 400) {
          alert(err.error.includes('expired') ? 'Code expired. Please resend.' : 'Invalid code. Please check your email.');
        } else {
          this.errorMessage.set('An error occurred during registration. Please try again.');
        }
      }
    });
  }

  closeSuccessModal() {
    this.showSuccessModal.set(false);
    this.router.navigate(['/login']);
  }
}
vigate(['/login']);
  }
}
