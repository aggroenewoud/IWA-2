import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.idw/src/leaflet-idw';
import 'leaflet-timedimension';
import 'leaflet-calendar';

declare module 'leaflet' {
  interface Map {
    timeDimension: any;
  }
}

import {Observable} from "rxjs";
import {WeatherdataService} from "../services/weatherdata.service";
import {ApiUrlBuilderService} from "../services/api-url-builder.service";
import {StationData} from "../interfaces/weather.interfaces";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {WeatherData} from '../interfaces/weather.interfaces';
import {Init} from "node:v8";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.css',
  ]
})

export class MapComponent implements OnInit {
  private map?: L.Map;
  title = 'get-data';
  url_builder = new ApiUrlBuilderService();
  data: StationData[] = [];

  constructor(private weatherdata: WeatherdataService) {
    //set default date and time to current date and time
    var date = new Date();
  }

  onSelectDate(value: any): void {
    console.log("onSelectDate called with value:", value);

    const selectedDateObj = new Date(value);
    selectedDateObj.setHours(12, 0, 0, 0);

    const nextDateObj = new Date(selectedDateObj.getTime() + 24 * 60 * 60 * 1000);

    const selectedDateString = selectedDateObj.toISOString().split('T')[0];
    const nextDateString = nextDateObj.toISOString().split('T')[0];

    const timeInterval = `${selectedDateString}T00:00:00/${nextDateString}T00:00:00`;

    console.log("Time interval to set:", timeInterval);

    if (this.map?.timeDimension) {
      console.log("Updating time dimension with new interval.");
      this.map.timeDimension.setAvailableTimes(timeInterval, 'replace');
      this.map.timeDimension.setCurrentTime(new Date(selectedDateString).getTime());
    } else {
      console.error("timeDimension is not defined on the map.");
    }
    console.log("onSelectDate finished.");
  }

  ngOnInit(): void {
  }

  private initMap(): void {
    // normal map
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map!);


    // this.weatherdata.GetData(this.url_builder.buildUrl()).subscribe(data => {
    //   console.log(data);
    //   this.data = data;
    //
    //   // Map the data to the format that heatLayer expects
    //   const heatData = this.data.map(datum => [
    //     datum.LAT,
    //     datum.LONG,
    //     //random balue between 0 and 50
    //     Math.random() * 50
    //   ]);
    //
    //   // Map the data to the format that heatLayer expects
    //   const heatData2 = this.data.map(datum => [
    //     datum.LAT,
    //     datum.LONG,
    //     //random balue between 0 and 50
    //     Math.random() * 50
    //   ]);
    //
    //   var temperature = (L as any).idwLayer(heatData, {
    //     opacity: 0.3,
    //     maxZoom: 18,
    //     cellSize: 5,
    //     exp: 3,
    //     max: 50
    //   }).addTo(this.map);
    //
    //   var humidity = (L as any).idwLayer(heatData2, {
    //     opacity: 0.3,
    //     maxZoom: 18,
    //     cellSize: 5,
    //     exp: 3,
    //     max: 50
    //   });
    //
    //   var heatMaps = {
    //     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">\
    //       <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>\
    //     <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>\
    //       </svg>': temperature,
    //     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">\
    //       <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>\
    //     </svg>': humidity
    //   };
    //
    //   var layerControl = (L as any).control.layers(heatMaps).addTo(this.map);
    // });

    (L as any).control.calendar({
      id: 1,
      onSelectDate: (value: any) => this.onSelectDate(value),
      position: "bottomright",
    }).addTo(this.map);

  }

  public load = new Observable((observer) => {
    const selectedDateObj = new Date();
    const nextDateObj = new Date(selectedDateObj.getTime() + 24 * 60 * 60 * 1000); // Add one day

    const selectedDateString = selectedDateObj.toISOString().split('T')[0];
    const nextDateString = nextDateObj.toISOString().split('T')[0];

    const timeInterval = `${selectedDateString}T00:00:00/${nextDateString}T00:00:00`;
    this.map = (L as any).map('map', {
      center: [49.45, 15.30],
      zoom: 7,
      timeDimension: true,
      updateTimeDimensions: true,
      timeDimensionOptions: {
        timeInterval: timeInterval,
        period: "PT1H",
      },
      timeDimensionControl: true,
      timeDimensionControlOptions: {
        timeZones: ["Local"],
        autoPlay: false,
        playButton: false,
        speedSlider: false,
      },
    });
    this.initMap();
    observer.next();
    observer.complete();
  });
}
