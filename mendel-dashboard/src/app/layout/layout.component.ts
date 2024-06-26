import {Component, Input} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @Input() icon: SafeHtml = '';
  @Input() title: string = '';
}
