import { Component, OnInit } from '@angular/core';

import { NewsInterface } from '../news-interface';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
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