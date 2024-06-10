import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import {Observable} from "rxjs";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.css',
  ]
})

export class MapComponent implements AfterViewInit {
  private map: L.Map | undefined

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    // normal map
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    // Initialize heatmap layer
    const heatmapLayer = (L as any).heatLayer([
      [50.5, 30.5, 500], // lat, lng, intensity
      [50.6, 30.4, 500],
    ], {radius: 25});
    this.map.addLayer(heatmapLayer);


  }

  constructor() { }

  ngAfterViewInit(): void {
  }

  public load = new Observable((observer) => {
    this.initMap();
    observer.next();
    observer.complete();
  });
}
