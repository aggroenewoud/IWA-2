import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.idw/src/leaflet-idw';

import {Observable} from "rxjs";
import {WeatherdataService} from "../services/weatherdata.service";
import {ApiUrlBuilderService} from "../services/api-url-builder.service";
import {StationData} from "../interfaces/weather.interfaces";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import { WeatherData } from '../interfaces/weather.interfaces';

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
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map);


    this.weatherdata.GetData(this.url_builder.buildUrl()).subscribe(data=> {
      console.log(data);
      this.data = data;

      // Map the data to the format that heatLayer expects
      const heatData = this.data.map(datum => [
        datum.LAT,
        datum.LONG,
        //random balue between 0 and 50
        Math.random() * 50
      ]);

      // Map the data to the format that heatLayer expects
      const heatData2 = this.data.map(datum => [
        datum.LAT,
        datum.LONG,
        //random balue between 0 and 50
        Math.random() * 50
      ]);

      var temperature = (L as any).idwLayer(heatData,{
        opacity: 0.3,
        maxZoom: 18,
        cellSize: 5,
        exp: 3,
        max: 50
      }).addTo(this.map);

      var humidity = (L as any).idwLayer(heatData2,{
        opacity: 0.3,
        maxZoom: 18,
        cellSize: 5,
        exp: 3,
        max: 50
      });

      var heatMaps = {
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">\
          <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>\
        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>\
          </svg>': temperature,
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">\
          <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>\
        </svg>': humidity
      };

      var layerControl = (L as any).control.layers(heatMaps).addTo(this.map);
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
