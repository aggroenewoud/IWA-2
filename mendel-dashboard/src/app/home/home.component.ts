import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../news/news.component';
import {HometimelineComponent} from '../hometimeline/hometimeline.component';
import { NewsInterface } from '../services/news-interface';
import { NewsService } from '../services/news.service';
import {LayoutComponent} from "../layout/layout.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent,
    CommonModule,
    HometimelineComponent, LayoutComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  svgIcon: SafeHtml = '';

  news: NewsInterface[] = [];

  constructor(private newsService: NewsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.news = this.newsService.getAllNews();
    this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">\
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>\
                    </svg>`);
  }
}
