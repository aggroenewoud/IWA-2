import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapShowComponent} from "./map-show/map-show.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapShowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mendel-dashboard';
}
