import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SecretService } from '../services/secret.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <div class="container-fluid py-5">
          <i class="fas fa-user-circle fa-6x mb-4 text-dark"></i>
          <h1 class="display-4 mb-2">My Profile</h1>
          <p class="lead mb-5 text-muted">Logged in as: <strong>{{ authService.username() }}</strong></p>
          
          <hr class="mb-5">
          
          <h2 class="h3 mb-4 text-start border-bottom pb-2">My History</h2>
          <div class="secrets-list">
            @for (entry of mySecrets(); track entry) {
              @for (secret of entry.secrets; track secret) {
                <div class="secret-card mb-4 p-4 shadow-sm">
                  <span class="quote-mark">"</span>
                  {{ secret }}
                  <span class="quote-mark">"</span>
                </div>
              }
            } @empty {
              <div class="text-muted italic py-5">
                You haven't shared any secrets yet.
              </div>
            }
          </div>

          <div class="action-buttons pt-5 mt-4 border-top">
            <a class="btn btn-dark btn-lg m-2 px-5" routerLink="/submit" role="button">Submit New</a>
            <a class="btn btn-outline-dark btn-lg m-2 px-5" routerLink="/" role="button">Home</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    h1, h2 {
      font-family: 'Georgia', serif;
      font-weight: bold;
    }
    .secret-card {
      font-size: 1.5rem;
      font-family: 'Georgia', serif;
      background-color: #ffffff;
      border-radius: 15px;
      color: #333;
      text-align: left;
      border-left: 5px solid #6c757d;
    }
    .quote-mark {
      color: #adb5bd;
      font-size: 2rem;
      font-weight: bold;
    }
    .italic {
      font-style: italic;
    }
  `]
})
export class ProfileComponent implements OnInit {
  mySecrets = computed(() => {
    const activeUser = this.authService.username();
    return this.secretService.allSecrets().filter(entry => entry.username === activeUser);
  });

  constructor(
    public secretService: SecretService, 
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.secretService.getAuthenticatedSecrets().subscribe();
  }
}
