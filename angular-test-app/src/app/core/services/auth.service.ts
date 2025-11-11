import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user: { email: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private apiUrl = '/api/login';
  private router = inject(Router);

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === '123456') {
          const res = {
            token: 'mock-token-123',
            user: { email },
          };
          this.cookies.set('authToken', res.token);
          this.cookies.set('userEmail', res.user.email);
          observer.next(res);
          observer.complete();
        } else {
          observer.error('Invalid credentials');
        }
      }, 1000);
    });
  }

  logout() {
    this.cookies.delete('authToken');
    this.cookies.delete('userEmail');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.cookies.check('authToken');
  }

  getUserEmail(): string {
    return this.cookies.get('userEmail');
  }
}
