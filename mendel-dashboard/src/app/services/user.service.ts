import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface'; 


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:5000/users';
  private apiUrlusers = 'http://127.0.0.1:5000/users/all';

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl, user, { headers });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User>(this.apiUrlusers);
  }
}
