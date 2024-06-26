import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Adjust the import path as necessary
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user.interface'; // Ensure the import path is correct

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UsertableComponent implements OnInit {
  users: User[] = []; // Use the User interface to define the array

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        // Convert the object to an array of User objects
        this.users = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      },
      error: (error) => console.error(error),
      complete: () => console.log('User data fetch complete')
    });
  }
}
