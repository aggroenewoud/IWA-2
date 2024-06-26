import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsInterface} from '../services/news-interface';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  @Input() newsInterface!: NewsInterface;
}
