import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticatedB = false;
  private apiUrl = 'http://127.0.0.1:5000/users'; // Update to your Flask API URL

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    if (this.isLocalStorageAvailable()) {
      this.isAuthenticatedB = localStorage.getItem('isAuthenticated') === 'true';
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<{ message: string }>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => console.log('Login response:', response)), // Debugging
      map(response => {
        const loginSuccess = response.message === 'Login success';
        this.isAuthenticatedB = loginSuccess;
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('isAuthenticated', loginSuccess.toString());
        }
        return loginSuccess;
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.isAuthenticatedB = false;
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('isAuthenticated', 'false');
        }
        return of(false);
      })
    );
  }

  logout() {
    this.isAuthenticatedB = false;
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('isAuthenticated');
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedB;
  }
}
