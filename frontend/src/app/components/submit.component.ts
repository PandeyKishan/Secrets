import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SecretService } from '../services/secret.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <div class="container-fluid py-5">
          <i class="fas fa-feather-alt fa-6x mb-4 text-dark"></i>
          <h1 class="display-4 mb-4">What's Your Secret?</h1>
          <p class="lead mb-2 text-muted">Go ahead, the world is listening (anonymously).</p>
          <p class="text-danger small mb-5 italic fw-bold">"Beware: Once you open up, there's no turning back. Secrets here are permanent."</p>

          <div class="row justify-content-center">
            <div class="col-md-8">
              <form (ngSubmit)="onSubmit()" class="mb-5">
                <div class="secret-input-card p-4 shadow-sm mb-4">
                  <span class="quote-mark">"</span>
                  <textarea 
                    class="form-control form-control-lg text-center shadow-none border-0 bg-transparent" 
                    name="secret" 
                    [(ngModel)]="secret" 
                    placeholder="Whisper it here..." 
                    rows="4"
                    required></textarea>
                  <div class="text-end">
                    <span class="quote-mark">"</span>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-dark btn-lg px-5 py-3 rounded-pill shadow">
                  <i class="fas fa-shuttle-space me-2"></i> Launch Secret
                </button>
              </form>

              <div class="action-buttons pt-2">
                <a class="btn btn-link text-dark text-decoration-none fs-5 fw-bold" routerLink="/secrets">
                  <i class="fas fa-arrow-left me-2"></i> Back to all secrets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Modal Overlay -->
    @if (showModal()) {
      <div class="modal-overlay">
        <div class="modal-card shadow-lg animate-pop">
          <i class="fas fa-check-circle fa-4x text-success mb-4"></i>
          <h2 class="mb-3">Launched!</h2>
          <p class="lead mb-4">Your secret is safe with us... 😉</p>
          <button class="btn btn-dark btn-lg px-5 rounded-pill" (click)="closeModal()">
            Continue
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    h1, h2 {
      font-family: 'Georgia', serif;
      font-weight: bold;
    }
    .secret-input-card {
      background-color: #ffffff;
      border-radius: 20px;
      border-left: 8px solid #212529;
      position: relative;
    }
    textarea {
      font-family: 'Georgia', serif;
      font-size: 1.8rem;
      color: #333;
      resize: none;
    }
    textarea::placeholder {
      color: #ced4da;
      font-style: italic;
    }
    .quote-mark {
      color: #e9ecef;
      font-size: 3rem;
      font-family: 'Georgia', serif;
      line-height: 1;
      display: block;
    }
    .quote-mark:first-child {
      text-align: left;
    }
    .btn-dark {
      transition: transform 0.2s;
    }
    .btn-dark:hover {
      transform: translateY(-3px);
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
export class SubmitComponent {
  secret: string = '';
  showModal = signal(false);

  constructor(
    private secretService: SecretService, 
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.secret || !this.secret.trim()) {
      alert('Your secret cannot be empty!');
      return;
    }

    this.secretService.submitSecret(this.secret, this.authService.username()).subscribe({
      next: () => {
        this.showModal.set(true);
      },
      error: (err) => alert('Submission failed: ' + err.error)
    });
  }

  closeModal() {
    this.showModal.set(false);
    this.router.navigate(['/secrets']);
  }
}
