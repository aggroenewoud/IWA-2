import {CommonModule, NgForOf} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Adjust the import path as necessary
import {User, Users} from '../interfaces/user.interfaces';
import {LayoutComponent} from "../layout/layout.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
// Adjust the import path as necessary

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css'],
  standalone: true,
  imports: [CommonModule, LayoutComponent]
})

export class UsertableComponent implements OnInit {
  users: User[] = []; // Initialize users as an empty array
  svgIcon: SafeHtml = '';

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      },
      error: (error) => console.error(error),
      complete: () => console.log('User data fetch complete')
    });

    this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        </svg>`);
  }
}
