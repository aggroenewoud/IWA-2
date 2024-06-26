import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MapShowComponent} from "../map-show/map-show.component";
import {WeatherTableComponent} from "../weather-table/weather-table.component";
import {LayoutComponent} from "../layout/layout.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-photosynthesis',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    MapShowComponent,
    WeatherTableComponent,
    LayoutComponent
  ],
  templateUrl: './photosynthesis.component.html',
  styleUrl: './photosynthesis.component.css'
})
export class PhotosynthesisComponent {
  svgIcon: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>`);
  }

}
