import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SecretService } from '../services/secret.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-secrets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="p-5 mb-4 bg-light rounded-3 text-center">
        <div class="container-fluid py-5">
          <i class="fas fa-user-secret fa-6x mb-3 text-dark"></i>
          <h1 class="display-4 mb-5">Confessions</h1>
          
          <div class="secrets-list mb-5">
            @for (user of secretService.allSecrets(); track user.username) {
              @for (secret of user.secrets; track secret) {
                <div class="secret-card mb-4 p-4 shadow-sm">
                  <span class="quote-mark">"</span>
                  {{ secret }}
                  <span class="quote-mark">"</span>
                </div>
              }
            } @empty {
              <div class="text-muted italic py-5">
                No secrets discovered yet...
              </div>
            }
          </div>

          <div class="action-buttons pt-4">
            <a class="btn btn-dark btn-lg m-2 px-5" routerLink="/submit" role="button" *ngIf="authService.isAuthenticated()">Submit a Secret</a>
            <a class="btn btn-outline-dark btn-lg m-2 px-5" routerLink="/" role="button">Home</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .secrets-list {
      min-height: 150px;
    }
    .secret-card {
      font-size: 1.5rem;
      font-family: 'Georgia', serif;
      background-color: #ffffff;
      border-radius: 15px;
      color: #333;
      border-left: 5px solid #212529;
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
export class SecretsComponent implements OnInit {
  constructor(
    public secretService: SecretService, 
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSecrets();
  }

  loadSecrets() {
    const fetch = this.authService.isAuthenticated() 
      ? this.secretService.getAuthenticatedSecrets() 
      : this.secretService.getPublicSecrets();
    
    fetch.subscribe();
  }
}
