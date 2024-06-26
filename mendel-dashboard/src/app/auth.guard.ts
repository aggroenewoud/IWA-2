import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('AuthGuard isAuthenticated:', isAuth); // Debugging
    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}