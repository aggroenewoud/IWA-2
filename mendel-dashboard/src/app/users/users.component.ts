import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  standalone: true
})
export class UsersComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['']
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
}