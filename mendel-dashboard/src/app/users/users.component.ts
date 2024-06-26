import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import {LayoutComponent} from "../layout/layout.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-user-form',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [ReactiveFormsModule, LayoutComponent], // Import ReactiveFormsModule here
  standalone: true
})
export class UsersComponent {
  userForm: FormGroup;
  svgIcon: SafeHtml = '';

  constructor(private fb: FormBuilder, private userService: UserService, private sanitizer: DomSanitizer) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(response => {
        console.log('User created:', response);
        this.userForm.reset();
      });
    }
  }

  ngOnInit(): void {
    this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        </svg>`);
  }
}
