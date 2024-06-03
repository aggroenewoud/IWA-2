import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
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
