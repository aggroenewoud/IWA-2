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

      var idw = (L as any).idwLayer(heatData,{
        opacity: 0.3,
        maxZoom: 18,
        cellSize: 5,
        exp: 3,
        max: 50
      }).addTo(this.map);
    });


  }

  private getAverage(data:WeatherData[]) {
    var average = 0;
    data.forEach(measurement => {
      average += Number(measurement.WDSP); // TODO: Make dynamic
    });
    console.log(average / data.length);
    return average / data.length;
  }

  ngAfterViewInit(): void {
  }

  public load = new Observable((observer) => {
    this.initMap();
    observer.next();
    observer.complete();
  });
}
