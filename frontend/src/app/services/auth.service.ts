import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  isAuthenticated = signal(false);
  username = signal<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token) {
      this.isAuthenticated.set(true);
      this.username.set(user);
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => this.saveSession(res))
    );
  }

  requestOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/request-otp`, { email }, { responseType: 'text' });
  }

  register(user: any, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { ...user, otp }, { responseType: 'text' });
  }

  saveSession(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', res.username);
    this.isAuthenticated.set(true);
    this.username.set(res.username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isAuthenticated.set(false);
    this.username.set(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
