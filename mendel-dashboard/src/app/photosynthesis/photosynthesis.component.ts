import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-photosynthesis',
  standalone: true,
    imports: [
        RouterOutlet,
        NgForOf
    ],
  templateUrl: './photosynthesis.component.html',
  styleUrl: './photosynthesis.component.css'
})
export class PhotosynthesisComponent {

}
