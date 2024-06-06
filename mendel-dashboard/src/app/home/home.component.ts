import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../news/news.component';
import { NewsInterface } from '../news-interface';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: NewsInterface[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.news = this.newsService.getAllNews();
  }
}