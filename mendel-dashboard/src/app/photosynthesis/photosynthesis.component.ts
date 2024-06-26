import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MapShowComponent} from "../map-show/map-show.component";

@Component({
  selector: 'app-photosynthesis',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    MapShowComponent
  ],
  templateUrl: './photosynthesis.component.html',
  styleUrl: './photosynthesis.component.css'
})
export class PhotosynthesisComponent {

}
