import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Adjust the import path as necessary
// Adjust the import path as necessary

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  users = []; // Initialize users as an empty array

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; // Ensure data is an array
      },
      error: (error) => console.error(error),
      complete: () => console.log('User data fetch complete')
    });
  }
}