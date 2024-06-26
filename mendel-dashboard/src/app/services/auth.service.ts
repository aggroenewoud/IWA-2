import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private apiUrl = 'http://127.0.0.1:5000/users'; // Update to your Flask API URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<{ message: string }>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => response.message === 'Login success'),
      catchError(error => {
        console.error('Login error:', error);
        return [false];
      })
    );
  }
}
