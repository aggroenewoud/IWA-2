import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(isAuthenticated => {
      console.log('isAuthenticated:', isAuthenticated); // Debugging
      if (isAuthenticated) {
        alert("Login Success");
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }

  ngOnInit() {
    // Get the form and add a listener for the submit event
    const form = this.el.nativeElement.querySelector('form');
    this.renderer.listen(form, 'submit', this.onLoginButtonClick.bind(this));
  }





  onLoginButtonClick(event: Event): void {
    event.preventDefault();

    // Get the form and fade it out
    const form = this.el.nativeElement.querySelector('form');
    this.renderer.setStyle(form, 'display', 'none');

    // Get the wrapper and add the 'form-success' class
    const wrapper = this.el.nativeElement.querySelector('.wrapper');
    this.renderer.addClass(wrapper, 'form-success');

  }
}




