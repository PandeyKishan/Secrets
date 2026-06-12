import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private apiUrl = 'http://localhost:8080/api';

  // Reactive state using Signals to keep the UI in sync
  private _secrets = signal<any[]>([]);
  
  // Publicly readable signal
  allSecrets = this._secrets.asReadonly();

  constructor(private http: HttpClient) {}

  getPublicSecrets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/secrets`).pipe(
      tap((data: any) => this._secrets.set(data))
    );
  }

  getAuthenticatedSecrets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/secrets`).pipe(
      tap((data: any) => this._secrets.set(data))
    );
  }

  getMySecrets(username: string | null): Observable<any> {
    // Backend returns all users with secrets, filtering is done via computed signals or component logic
    return this.getAuthenticatedSecrets();
  }

  submitSecret(secret: string, username: string | null = 'Anonymous'): Observable<any> {
    return this.http.post(`${this.apiUrl}/secrets/submit`, { secret }, { responseType: 'text' }).pipe(
      // Refresh the secrets list from the server after a successful submission
      tap(() => this.getAuthenticatedSecrets().subscribe())
    );
  }
}
