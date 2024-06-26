import { Component } from '@angular/core';
import {MapShowComponent} from "../map-show/map-show.component";

@Component({
  selector: 'app-aircirculation',
  standalone: true,
    imports: [
        MapShowComponent
    ],
  templateUrl: './aircirculation.component.html',
  styleUrl: './aircirculation.component.css'
})
export class AircirculationComponent {

}
