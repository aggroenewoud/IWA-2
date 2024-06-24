import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.idw/src/leaflet-idw';
import 'leaflet-timedimension';
import 'leaflet-calendar';
import {Observable} from "rxjs";
import {WeatherdataService} from "../services/weatherdata.service";
import {ApiUrlBuilderService} from "../services/api-url-builder.service";
import {StationData} from "../interfaces/weather.interfaces";

declare module 'leaflet' {
  interface Map {
    timeDimension: any;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  private map?: L.Map;

  private layerControl?: L.Control.Layers;
  private temperatureLayer?: L.Layer;
  private humidityLayer?: L.Layer;

  data: StationData[] = [];

  temperatureText: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">\
            <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>\
            <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>\
         </svg>';

  humidityText: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">\
          <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>\
        </svg>';

  selectedLayer: string = this.temperatureText;

  currentTime: Date = new Date();

  constructor(private weatherdata: WeatherdataService, private url_builder: ApiUrlBuilderService) {
  }

  ngOnInit(): void {
    this.load.subscribe();
    if (this.map) {
      this.map.timeDimension.on('timeload', () => {
        this.currentTime = new Date(this.map!.timeDimension.getCurrentTime());
        this.updateHeatMaps();
      });
    }
  }

  createTimeInterval(selectedDateObj: Date, nextDateObj: Date): number[] {
    const timeInterval = [];
    let currentDate = new Date(selectedDateObj.getTime());

    while (currentDate <= nextDateObj) {
      timeInterval.push(currentDate.getTime());
      currentDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add one hour
    }

    return timeInterval;
  }

  onSelectDate(value: any): void {
    const selectedDateObj = new Date(value);
    selectedDateObj.setHours(0, 0, 0, 0);
    const nextDateObj = new Date(selectedDateObj.getTime() + 24 * 60 * 60 * 1000); // Add one day

    if (this.map) {
      const timeInterval = this.createTimeInterval(selectedDateObj, nextDateObj);
      this.map.timeDimension.setAvailableTimes(timeInterval, "replace");
      selectedDateObj.setHours(12, 0, 0, 0);
      this.map.timeDimension.setCurrentTime(selectedDateObj.getTime());
    }
  }

  addWorldLayer(): void {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map!);
  }

  addCalendar(): void {
    (L as any).control.calendar({
      id: 1,
      onSelectDate: (value: any) => this.onSelectDate(value),
      position: "bottomright",
    }).addTo(this.map);
  }

  updateHeatMaps(): void {
    this.url_builder.setStartDate(this.currentTime.toISOString());
    this.url_builder.setEndDate(new Date(this.currentTime.getTime() + 60 * 60 * 1000).toISOString());

    console.log(this.currentTime.toISOString());
    console.log(new Date(this.currentTime.getTime() + 60 * 60 * 1000).toISOString());
    this.weatherdata.GetData(this.url_builder.buildUrl()).subscribe(data => {
      console.log(data);
      this.data = data;

      // Map the data to the format that heatLayer expects
      const tempData = this.data.map(datum => [
        datum.LAT,
        datum.LONG,
        // get average temperature
        datum.DATA.reduce((acc, curr) => acc + parseFloat(curr.TEMP!), 0) / datum.DATA.length
      ]);

      const humData = this.data.map(datum => [
        datum.LAT,
        datum.LONG,
        // get average humidity
        datum.DATA.reduce((acc, curr) => acc + parseFloat(curr.DEWP!), 0) / datum.DATA.length
      ]);

      // create teamperature layer
      if (this.temperatureLayer) {
        this.map!.removeLayer(this.temperatureLayer);
      }

      this.temperatureLayer = (L as any).idwLayer(tempData, {
        opacity: 0.3,
        maxZoom: 18,
        cellSize: 5,
        exp: 3,
        max: 50
      })

      // create teamperature layer
      if (this.humidityLayer) {
        this.map!.removeLayer(this.humidityLayer);
      }

      this.humidityLayer = (L as any).idwLayer(humData, {
        opacity: 0.3,
        maxZoom: 18,
        cellSize: 5,
        exp: 3,
        max: 50
      })

      var heatMaps = {
        [this.temperatureText]: this.temperatureLayer,
        [this.humidityText]: this.humidityLayer,
      };

      // Add the selected layer to the map
      if (this.selectedLayer === this.temperatureText) {
        // cast as Layer to avoid type error
        this.map!.addLayer(this.temperatureLayer as L.Layer);
      } else if (this.selectedLayer === this.humidityText) {
        // cast as Layer to avoid type error
        this.map!.addLayer(this.humidityLayer as L.Layer);
      }

      // Remove previous layer control
      if (this.layerControl) {
        this.map!.removeControl(this.layerControl);
      }

      // Create new layer control and save the reference
      this.layerControl = (L as any).control.layers(heatMaps).addTo(this.map);
    });
  }

  private initMap(): void {
    this.addWorldLayer();
    this.addCalendar();
    this.updateHeatMaps();

    this.map!.on('baselayerchange', (event: any) => {
      this.selectedLayer = event.name;
    });
  }

  public load = new Observable((observer) => {
    const selectedDateObj = new Date();
    const nextDateObj = new Date(selectedDateObj.getTime() + 24 * 60 * 60 * 1000); // Add one day

    const timeInterval = `${selectedDateObj.toISOString().split('T')[0]}T00:00:00/${nextDateObj.toISOString().split('T')[0]}T00:00:00`;
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
    this.currentTime = new Date(this.map!.timeDimension.getCurrentTime());
    this.initMap();
    observer.next();
    observer.complete();
  });
}
