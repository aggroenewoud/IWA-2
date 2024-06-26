import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MapShowComponent} from "../map-show/map-show.component";
import {WeatherTableComponent} from "../weather-table/weather-table.component";

@Component({
  selector: 'app-photosynthesis',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    MapShowComponent,
    WeatherTableComponent
  ],
  templateUrl: './photosynthesis.component.html',
  styleUrl: './photosynthesis.component.css'
})
export class PhotosynthesisComponent {

}
