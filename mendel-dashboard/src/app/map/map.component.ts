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
  private windSpeedLayer?: L.Layer;
  private humidityLayer?: L.Layer;

  data: StationData[] = [];

  windSpeedText: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">\
                            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>\
                          </svg>';

  humidityText: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">\
                            <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.51.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>\
                          </svg>';



  selectedLayer: string = this.windSpeedText;

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

    this.weatherdata.GetData(this.url_builder.buildUrl()).subscribe(data => {
      this.data = data;

      // Map the data to the format that heatLayer expects
      const windSpeedData = this.data.map(datum => [
        datum.LAT,
        datum.LONG,
        // get average temperature
        datum.DATA.reduce((acc, curr) => acc + parseFloat(curr.WDSP!), 0) / datum.DATA.length
      ]);

      const humData = this.data.map(datum => [
        datum.LAT,
        datum.LONG,
        // get average humidity
        datum.DATA.reduce((acc, curr) => acc + parseFloat(curr.DEWP!), 0) / datum.DATA.length
      ]);

      // create teamperature layer
      if (this.windSpeedLayer) {
        this.map!.removeLayer(this.windSpeedLayer);
      }

      this.windSpeedLayer = (L as any).idwLayer(windSpeedData, {
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
        [this.windSpeedText]: this.windSpeedLayer,
        [this.humidityText]: this.humidityLayer,
      };

      // Add the selected layer to the map
      if (this.selectedLayer === this.windSpeedText) {
        // cast as Layer to avoid type error
        this.map!.addLayer(this.windSpeedLayer as L.Layer);
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
