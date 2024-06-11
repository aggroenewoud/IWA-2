import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import {Observable} from "rxjs";
import {WeatherdataService} from "../services/weatherdata.service";
import {ApiUrlBuilderService} from "../services/api-url-builder.service";
import {StationData} from "../interfaces/weather.interfaces";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

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
  title = 'get-data';
  url_builder = new ApiUrlBuilderService();
  data: StationData[] = [];

  constructor(private weatherdata:WeatherdataService) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [49.45, 15.30],
      zoom: 7
    });

    // normal map
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);


    this.weatherdata.GetData(this.url_builder.buildUrl()).subscribe(data=> {
      console.log(data);
      this.data = data;

      // Map the data to the format that heatLayer expects
      const heatData = this.data.map(datum => [datum.LAT, datum.LONG, 50]);

      // Create the heatmap layer
      const heatmapLayer = (L as any).heatLayer(heatData, {radius: 150});

      // Add the heatmap layer to the map
      this.map?.addLayer(heatmapLayer);
    });


  }

  ngAfterViewInit(): void {
  }

  public load = new Observable((observer) => {
    this.initMap();
    observer.next();
    observer.complete();
  });
}
