import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private hardcodedUser = {
    username: 'testUser',
    password: 'testPassword'
  };

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === this.hardcodedUser.username && password === this.hardcodedUser.password) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
